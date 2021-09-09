import { MaxLengthParamError } from '../../presentation/errors/max-length-error'
import { MaxLengthValidator } from './max-length-validator'

interface SutTypes {
  sut: MaxLengthValidator
}

const makeSut = (): SutTypes => {
  return { sut: new MaxLengthValidator('field1', 3) }
}

describe('Max Length Validator', () => {
  test('Garantir se campo for preenchido com mais caracteres do que o limite retornar MaxLengthParamError', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      field1: 'teste'
    })
    expect(error).toEqual(new MaxLengthParamError('field1', 3))
  })

  test('Garantir se campo for preenchido com menos caracteres do que o limite retornar null', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      field1: 't'
    })
    expect(error).toBeUndefined()
  })

  test('Garantir se campo for preenchido com o máximo de caracteres do que o limite retornar null', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      field1: 'tes'
    })
    expect(error).toBeUndefined()
  })
})
