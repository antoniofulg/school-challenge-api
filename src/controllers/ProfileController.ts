import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import profileView from '../views/profile_view'
import Profile from '../models/Profile'

export default {
  async index(request: Request, response: Response) {
    const profileRepository = getRepository(Profile)

    const profiles = await profileRepository.find({
      relations: ['matter', 'teacher', 'degrees.degreeId'],
      order: {
        id: 'DESC',
      },
    })

    return response
      .status(200)
      .json({ profile: profileView.renderMany(profiles) })
  },

  async create(request: Request, response: Response) {
    const { teacherId, matterId } = request.body

    const profileRepository = getRepository(Profile)

    const profile = profileRepository.create({
      teacherId,
      matterId,
    })

    await profileRepository.save(profile)

    return response.status(201).json(profile)
  },
}
