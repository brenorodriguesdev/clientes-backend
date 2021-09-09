import { CreateClientUseCase } from '../../domain/usecases/create-client'
import { Validator } from '../../validation/contracts/validator'
import { HttpRequest } from '../protocols/http'
import { badRequest, created, serverError } from '../protocols/http-helper'
import { CreateClientController } from './create-client'

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (): Error {
      return null
    }
  }
  return new ValidatorStub()
}

const makeCreateClientUseCase = (): CreateClientUseCase => {
  class CreateClientUseCaseStub implements CreateClientUseCase {
    async create (): Promise<void | Error> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new CreateClientUseCaseStub()
}

interface SutTypes {
  sut: CreateClientController
  validator: Validator
  createClientUseCase: CreateClientUseCase
}
const makeSut = (): SutTypes => {
  const validator = makeValidator()
  const createClientUseCase = makeCreateClientUseCase()
  const sut = new CreateClientController(validator, createClientUseCase)
  return {
    sut,
    validator,
    createClientUseCase
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

describe('Create Client Controller', () => {
  test('Garantir que o validate seja chamado com os valores correto', async () => {
    const { sut, validator } = makeSut()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Garantir que se o validate retornar error retornar badRequest com esse error', async () => {
    const { sut, validator } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(validator, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(error))
  })

  test('Garantir que se o validate retornar uma exceção retornar serverError', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError())
  })

  test('Garantir que o create seja chamado com os valores correto', async () => {
    const { sut, createClientUseCase } = makeSut()
    const createSpy = jest.spyOn(createClientUseCase, 'create')
    await sut.handle(httpRequest)
    expect(createSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Garantir que se o create retornar error retornar badRequest com esse error', async () => {
    const { sut, createClientUseCase } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(createClientUseCase, 'create').mockResolvedValueOnce(error)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(error))
  })

  test('Garantir que se o create retornar uma exceção retornar serverError', async () => {
    const { sut, createClientUseCase } = makeSut()
    jest.spyOn(createClientUseCase, 'create').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError())
  })

  test('Garantir que se tudo ocorre como esperado retornar um created', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created())
  })
})
