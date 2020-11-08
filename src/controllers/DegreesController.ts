import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Degree from '../models/Degree'

export default {
  async index(request: Request, response: Response) {
    const degreesRepository = getRepository(Degree)

    const degrees = await degreesRepository.find()

    return response.status(200).json(degrees)
  },

  async create(request: Request, response: Response) {
    const { name } = request.body

    const degreesRepository = getRepository(Degree)

    const degree = degreesRepository.create({
      name,
    })

    await degreesRepository.save(degree)

    return response.status(201).json(degree)
  },
}
