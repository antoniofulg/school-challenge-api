import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Matter from '../models/Matter'

export default {
  async index(request: Request, response: Response) {
    const mattersRepository = getRepository(Matter)

    const matters = await mattersRepository.find()

    return response.status(200).json({
      matters,
    })
  },

  async create(request: Request, response: Response) {
    const { name } = request.body

    const mattersRepository = getRepository(Matter)

    const matter = mattersRepository.create({
      name,
    })

    await mattersRepository.save(matter)

    return response.status(201).json(matter)
  },
}
