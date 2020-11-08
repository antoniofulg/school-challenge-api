import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import RelationshipDegree from '../models/RelationshipDegree'

export default {
  async index(request: Request, response: Response) {
    const relationshipDegreesRepository = getRepository(RelationshipDegree)

    const relationshipDegree = await relationshipDegreesRepository.find()

    return response.status(200).json(relationshipDegree)
  },

  async create(request: Request, response: Response) {
    const { relationshipId, degreeId } = request.body

    const relationshipDegreesRepository = getRepository(RelationshipDegree)

    const relationshipDegrees = relationshipDegreesRepository.create({
      relationshipId,
      degreeId,
    })

    await relationshipDegreesRepository.save(relationshipDegrees)

    return response.status(201).json(relationshipDegrees)
  },
}
