import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import profileView from '../views/profile_view'
import Class from '../models/Class'
import Degree from '../models/Degree'
import Profile from '../models/Profile'
import ProfileDegree from '../models/ProfileDegree'
import Teacher from '../models/Teacher'
import Matter from '../models/Matter'

const getDegreesClassesEntities = async (degreesClasses: any) => {
  const classRepository = getRepository(Class)
  const degreeRepository = getRepository(Degree)

  const profileDegrees = []

  for await (const degreeClass of degreesClasses) {
    const degree = await degreeRepository.findOneOrFail(degreeClass.degreeId)
    const classes = []
    for await (const classItem of degreeClass.classes) {
      classes.push(await classRepository.findOneOrFail(classItem))
    }
    profileDegrees.push({
      degree,
      classes,
    })
  }

  return profileDegrees
}

export default {
  async index(request: Request, response: Response) {
    const profileRepository = getRepository(Profile)

    const profiles = await profileRepository.find({
      relations: ['matter', 'teacher', 'degrees'],
      order: {
        id: 'DESC',
      },
    })

    return response
      .status(200)
      .json({ profile: profileView.renderMany(profiles) })
  },

  async create(request: Request, response: Response) {
    try {
      const { teacherId, matterId, degreesClasses } = request.body

      const profileRepository = getRepository(Profile)
      const profileDegreeRepository = getRepository(ProfileDegree)
      const teacherRepository = getRepository(Teacher)
      const matterRepository = getRepository(Matter)

      const teacher = await teacherRepository.findOneOrFail(teacherId)
      const matter = await matterRepository.findOneOrFail(matterId)

      const profileDegrees = await getDegreesClassesEntities(degreesClasses)

      const profile = profileRepository.create({
        teacher,
        matter,
      })

      await profileRepository.save(profile)

      profileDegrees.map(async (profileDegree: any) => {
        const data = profileDegreeRepository.create({
          profile,
          degree: profileDegree.degree,
          classes: profileDegree.classes,
        })
        await profileDegreeRepository.save(data)
      })

      return response
        .status(201)
        .json({ message: 'Perfil cadastrado com sucesso!' })
    } catch (error) {
      console.log(error)
      return response
        .status(404)
        .json({ message: 'Não foi possível cadastrar o perfil do professor!' })
    }
  },
}
