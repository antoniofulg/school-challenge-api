import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Relationship from '../models/Relationship'

export default {
  async index(request: Request, response: Response) {
    const relationshipsRepository = getRepository(Relationship)

    const relationships = await relationshipsRepository.find()

    return response.status(200).json(relationships)
  },

  async create(request: Request, response: Response) {
    const { teacherId, matterId } = request.body

    const relationshipsRepository = getRepository(Relationship)

    const relationships = relationshipsRepository.create({
      teacherId,
      matterId,
    })

    await relationshipsRepository.save(relationships)

    return response.status(201).json(relationships)
  },
}
