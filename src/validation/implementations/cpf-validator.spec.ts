import { CPFValidator } from './cpf-validator'
import { cpf } from 'cpf-cnpj-validator'
import { InvalidParamError } from '../../presentation/errors/invalid-param-error'

const makeSut = (): CPFValidator => {
  return new CPFValidator('cpf')
}

describe('CPF Validator', () => {
  test('Garantir que se o isValid retornar false retornar InvalidParamError', () => {
    const sut = makeSut()
    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({})
    expect(error).toEqual(new InvalidParamError('cpf'))
  })

  test('Garantir que se o isValid retornar true retornar null', () => {
    const sut = makeSut()
    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(true)
    const error = sut.validate({})
    expect(error).toBeUndefined()
  })
})
