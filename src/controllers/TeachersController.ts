import { Request, Response } from 'express'
import { FindOperator, getRepository, Like } from 'typeorm'

import teacherView from '../views/teachers_view'
import Teacher from '../models/Teacher'

interface FilterQuery {
  type: string
  value?: string
}

interface Filter {
  text: string
  value?: string
}

const getFilters = (filters: Array<FilterQuery>) => {
  filters = filters.filter((filter) => filter.value)
  return filters.map((filter) => {
    switch (filter.type) {
      case 'name':
        return {
          text: `teacher.name like :${filter.type}`,
          value: `%${filter.value}%`,
        }
      default:
        return {
          text: `${filter.type}.id = ${filter.value}`,
        }
    }
  })
}

const getTeachers = (filters: Array<Filter>) => {
  let query = getRepository(Teacher)
    .createQueryBuilder('teacher')
    .leftJoinAndSelect('teacher.profile', 'profile')
    .leftJoinAndSelect('profile.matter', 'matter')
    .leftJoinAndSelect('profile.degrees', 'profile_degrees')
    .leftJoinAndSelect('profile_degrees.degree', 'degree')
    .leftJoinAndSelect('profile_degrees.classes', 'class')
    .orderBy('teacher.id', 'DESC')
  filters.forEach((filter, index) => {
    if (filter.value && index === 0) {
      query = query.where(filter.text, { name: filter.value })
    } else if (!filter.value && index === 0) {
      query = query.where(filter.text)
    } else {
      query = query.andWhere(filter.text)
    }
  })
  return query.getMany()
}

export default {
  async index(request: Request, response: Response) {
    const { name, degreeId, classId } = request.query

    const filters = getFilters([
      {
        type: 'name',
        value: name as string,
      },
      {
        type: 'degree',
        value: degreeId as string,
      },
      {
        type: 'class',
        value: classId as string,
      },
    ])

    const teachers = await getTeachers(filters)

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
