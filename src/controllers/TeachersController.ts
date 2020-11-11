import { Request, Response } from 'express'
import { FindOperator, getRepository, Like } from 'typeorm'

import teacherView from '../views/teachers_view'
import Teacher from '../models/Teacher'
import Profile from '../models/Profile'
import ProfileDegree from '../models/ProfileDegree'
import Matter from '../models/Matter'
import Class from '../models/Class'
import Degree from '../models/Degree'

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

const deleteOldDegreesClassesEntities = async (profile: Profile) => {
  await getRepository(ProfileDegree)
    .createQueryBuilder('profile_degree')
    .delete()
    .where('profileId = :id', { id: profile.id })
    .execute()
}

const getDegreesClassesEntities = async (profileDegreesItems: any) => {
  const classRepository = getRepository(Class)
  const degreeRepository = getRepository(Degree)

  const profileDegrees = []

  for await (const profileDegreeItem of profileDegreesItems) {
    const degree = await degreeRepository.findOneOrFail(
      profileDegreeItem.degree.id
    )
    const classes = []
    for await (const classItem of profileDegreeItem.classes) {
      classes.push(await classRepository.findOneOrFail(classItem.id))
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

    const teacher = await getRepository(Teacher)
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.profile', 'profile')
      .leftJoinAndSelect('profile.matter', 'matter')
      .leftJoinAndSelect('profile.degrees', 'profile_degrees')
      .leftJoinAndSelect('profile_degrees.degree', 'degree')
      .leftJoinAndSelect('profile_degrees.classes', 'class')
      .where('teacher.id = :id', { id })
      .getOneOrFail()

    return response.status(200).json({ teacher: teacherView.render(teacher) })
  },

  async create(request: Request, response: Response) {
    const { name } = request.body

    const teachersRepository = getRepository(Teacher)

    const teacher = teachersRepository.create({
      name,
    })

    await teachersRepository.save(teacher)

    return response.status(201).json({
      message: 'Professor cadastrado com sucesso!',
      teacher: teacherView.render(teacher),
    })
  },

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const newTeacher = request.body

      const profilesRepository = getRepository(Profile)
      const teachersRepository = getRepository(Teacher)
      const mattersRepository = getRepository(Matter)
      const profileDegreeRepository = getRepository(ProfileDegree)

      const teacher = await teachersRepository.findOneOrFail(id)
      const profile = await profilesRepository.findOneOrFail(id)
      const matter = await mattersRepository.findOneOrFail(
        newTeacher.profile.matter.id
      )

      const profileDegrees = await getDegreesClassesEntities(
        newTeacher.profile.degrees
      )

      teacher.name = newTeacher.name
      profile.matter = matter

      await teachersRepository.save(teacher)
      await profilesRepository.save(profile)

      await deleteOldDegreesClassesEntities(profile)

      profileDegrees.map(async (profileDegree: any) => {
        const data = profileDegreeRepository.create({
          profile,
          degree: profileDegree.degree,
          classes: profileDegree.classes,
        })
        await profileDegreeRepository.save(data)
      })

      return response
        .status(200)
        .json({ message: 'Professor atualizado com sucesso!' })
    } catch (error) {
      return response
        .status(404)
        .json({ message: 'Não foi possível editar o professor!' })
    }
  },
}
