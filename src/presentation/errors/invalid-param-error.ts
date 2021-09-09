export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`O campo ${paramName} é inválido`)
  }
}
