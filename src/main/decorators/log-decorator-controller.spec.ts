import { LogErrorRepository } from '../../data/contracts/log-error-repository'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'
import { created } from '../../presentation/protocols/http-helper'
import { LogDecoratorController } from './log-decorator-controller'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => resolve(created()))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

export interface SutTypes {
  controller: Controller
  logErrorRepository: LogErrorRepository
  sut: LogDecoratorController
}

const makeSut = (): SutTypes => {
  const controller = makeController()
  const logErrorRepository = makeLogErrorRepository()
  const sut = new LogDecoratorController(controller, logErrorRepository)
  return {
    controller,
    logErrorRepository,
    sut
  }
}

const httpRequest: HttpRequest = ({
  body: {
    nome: 'any_nome',
    cpf: 'any_cpf',
    dataNascimento: new Date('1999-03-23'),
    rendaFamiliar: 2000
  }
})

describe('Log Decorator Controller', () => {
  test('Garantir que o handle seja chamado com o httpRequest correto', async () => {
    const { sut, controller } = makeSut()
    const handleSpy = jest.spyOn(controller, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Garantir que retorne com o httpResponse correto', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created())
  })
})
