import { CreateClientUseCase } from '../../domain/usecases/create-client'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, created, serverError } from '../protocols/http-helper'

export class CreateClientController implements Controller {
  constructor (private readonly validator: Validator, private readonly createClientUseCase: CreateClientUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { nome, cpf, dataNascimento, rendaFamiliar } = httpRequest.body
      const hasError = await this.createClientUseCase.create({
        nome,
        cpf,
        dataNascimento,
        rendaFamiliar
      })
      if (hasError) {
        return badRequest(hasError)
      }
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
