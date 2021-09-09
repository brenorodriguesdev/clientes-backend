
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateClientControler } from '../factories/controllers/create-client-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/client', adaptRoute(makeCreateClientControler()))
}
