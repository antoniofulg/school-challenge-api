import { Router } from 'express'
import ClassesController from './controllers/ClassesController'
import DegreesController from './controllers/DegreesController'
import MattersController from './controllers/MattersController'
import ProfileController from './controllers/ProfileController'
import StudentsController from './controllers/StudentsController'
import TeachersController from './controllers/TeachersController'

const routes = Router()

/** classes */
routes.get('/classes', ClassesController.index)
routes.post('/classes', ClassesController.create)

/** degrees */
routes.get('/degrees', DegreesController.index)
routes.get('/degrees/students', DegreesController.students)
routes.post('/degrees', DegreesController.create)

/** matters */
routes.get('/matters', MattersController.index)
routes.post('/matters', MattersController.create)

/** profile */
routes.get('/profiles', ProfileController.index)
routes.post('/profiles', ProfileController.create)

/** students */
routes.get('/students', StudentsController.index)
routes.get('/students/:id', StudentsController.show)
routes.post('/students', StudentsController.create)
routes.put('/students/:id', StudentsController.update)

/** teachers */
routes.get('/teachers', TeachersController.index)
routes.get('/teachers/:id', TeachersController.show)
routes.post('/teachers', TeachersController.create)

export default routes
