import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Teacher from '../models/Teacher'

export default {
  async index(request: Request, response: Response) {
    const teachersRepository = getRepository(Teacher)

    const teachers = await teachersRepository.find()

    return response.status(200).json(teachers)
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const teachersRepository = getRepository(Teacher)

    const teacher = await teachersRepository.findOneOrFail(id)

    return response.status(200).json(teacher)
  },

  async create(request: Request, response: Response) {
    const { name } = request.body

    const teachersRepository = getRepository(Teacher)

    const teacher = teachersRepository.create({
      name,
    })

    await teachersRepository.save(teacher)

    return response.status(201).json(teacher)
  },
}
