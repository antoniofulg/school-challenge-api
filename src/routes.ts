import { Router } from 'express'
import ClassesController from './controllers/ClassesController'
import DegreesController from './controllers/DegreesController'
import MattersController from './controllers/MattersController'
import RelationshipsController from './controllers/RelationshipsController'
import RelationshipDegreesController from './controllers/RelationshipDegreesController'
import RelationshipDegreeClassesController from './controllers/RelationshipDegreeClassesController'
import StudentsController from './controllers/StudentsController'
import TeachersController from './controllers/TeachersController'

const routes = Router()

/** classes */
routes.get('/classes', ClassesController.index)
routes.post('/classes', ClassesController.create)

/** degrees */
routes.get('/degrees', DegreesController.index)
routes.post('/degrees', DegreesController.create)

/** matters */
routes.get('/matters', MattersController.index)
routes.post('/matters', MattersController.create)

/** relationship */
routes.get('/relationships', RelationshipsController.index)
routes.post('/relationships', RelationshipsController.create)

/** relationships */
routes.get('/relationship-degrees', RelationshipDegreesController.index)
routes.post('/relationship-degrees', RelationshipDegreesController.create)

/** relationships */
routes.get(
  '/relationship-degree-classes',
  RelationshipDegreeClassesController.index
)
routes.post(
  '/relationship-degree-classes',
  RelationshipDegreeClassesController.create
)

/** students */
routes.get('/students', StudentsController.index)
routes.get('/students/:id', StudentsController.show)
routes.post('/students', StudentsController.create)

/** teachers */
routes.get('/teachers', TeachersController.index)
routes.get('/teachers/:id', TeachersController.show)
routes.post('/teachers', TeachersController.create)

export default routes
