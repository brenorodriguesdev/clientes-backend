export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`O campo ${paramName} é obrigatório`)
  }
}
