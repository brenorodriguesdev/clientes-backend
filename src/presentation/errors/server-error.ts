export class ServerError extends Error {
  constructor (stack: string) {
    super('Tente novamente mais tarde')
    this.stack = stack
  }
}
