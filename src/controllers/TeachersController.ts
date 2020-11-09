import { Request, Response } from 'express'
import { FindOperator, getRepository, Like } from 'typeorm'

import teacherView from '../views/teachers_view'
import Teacher from '../models/Teacher'

interface Filter {
  name?: FindOperator<String>
}

export default {
  async index(request: Request, response: Response) {
    const teachersRepository = getRepository(Teacher)
    const { name, degreeId, classId } = request.query

    const filters: Filter = {}

    const teachers = await teachersRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.profile', 'profile')
      .leftJoinAndSelect('profile.matter', 'matter')
      .leftJoinAndSelect('profile.degrees', 'profile_degrees')
      .leftJoinAndSelect('profile_degrees.degree', 'degree')
      .leftJoinAndSelect('profile_degrees.classes', 'class')
      .where('teacher.id like :name', { name: '%2%' })
      .andWhere('degree.id = 1')
      .andWhere('class.id = 3')
      .getMany()

    return response.status(200).json({
      teachers: teacherView.renderMany(teachers),
    })
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
