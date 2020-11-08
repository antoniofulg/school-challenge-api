import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import RelationshipDegreeClass from '../models/RelationshipDegreeClass'

export default {
  async index(request: Request, response: Response) {
    const relationshipDegreeClassesRepository = getRepository(
      RelationshipDegreeClass
    )

    const relationshipDegreeClass = await relationshipDegreeClassesRepository.find()

    return response.status(200).json(relationshipDegreeClass)
  },

  async create(request: Request, response: Response) {
    const { relationshipDegreeId, classId } = request.body

    const relationshipDegreeClassesRepository = getRepository(
      RelationshipDegreeClass
    )

    const relationshipDegreeClasses = relationshipDegreeClassesRepository.create(
      {
        relationshipDegreeId,
        classId,
      }
    )

    await relationshipDegreeClassesRepository.save(relationshipDegreeClasses)

    return response.status(201).json(relationshipDegreeClasses)
  },
}
