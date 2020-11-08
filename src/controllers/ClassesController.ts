import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Class from '../models/Class'

export default {
  async index(request: Request, response: Response) {
    const classesRepository = getRepository(Class)

    const classes = await classesRepository.find()

    return response.status(200).json(classes)
  },

  async create(request: Request, response: Response) {
    const { name } = request.body

    const classesRepository = getRepository(Class)

    const classEntity = classesRepository.create({
      name,
    })

    await classesRepository.save(classEntity)

    return response.status(201).json(classEntity)
  },
}
