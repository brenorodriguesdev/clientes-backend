import { Validator } from '../contracts/validator'
import { CompositeValidator } from './composite-validator'

interface SutTypes {
  validators: Validator[]
  sut: CompositeValidator
}

export const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (value: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}

const makeSut = (): SutTypes => {
  const validators = [makeValidator(), makeValidator(), makeValidator()]
  return { validators, sut: new CompositeValidator(validators) }
}

describe('CompositeValidator', () => {
  test('Garantir se algum validator retornar erro retornar esse erro', () => {
    const { sut, validators } = makeSut()
    jest.spyOn(validators[0], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({
      field1: ''
    })
    expect(error).toEqual(new Error())
  })

  test('Garantir se nenhum validator retornar erro retornar null', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      field1: ''
    })
    expect(error).toBeUndefined()
  })
})
