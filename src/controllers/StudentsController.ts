import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Student from '../models/Student'

export default {
  async index(request: Request, response: Response) {
    const studentsRepository = getRepository(Student)

    const students = await studentsRepository.find()

    return response.status(200).json(students)
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const studentsRepository = getRepository(Student)

    const student = await studentsRepository.findOneOrFail(id)

    return response.status(200).json(student)
  },

  async create(request: Request, response: Response) {
    const { ra, name, degreeId, classId } = request.body

    const studentsRepository = getRepository(Student)

    const students = studentsRepository.create({
      ra,
      name,
      degreeId,
      classId,
    })

    await studentsRepository.save(students)

    return response.status(201).json(students)
  },
}
