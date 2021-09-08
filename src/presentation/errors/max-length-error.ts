export class MaxLengthParamError extends Error {
  constructor (paramName: string, maxLength: number) {
    super(`O máximo de caracteres permitido no ${paramName} é ${maxLength}`)
  }
}
