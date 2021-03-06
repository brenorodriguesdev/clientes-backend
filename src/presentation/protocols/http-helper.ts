import { ServerError } from '../errors/server-error'
import { HttpResponse } from './http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const created = (): HttpResponse => ({
  statusCode: 201,
  body: null
})
