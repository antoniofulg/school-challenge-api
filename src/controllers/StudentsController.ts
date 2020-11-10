import { Request, Response } from 'express'
import { FindOperator, getRepository, Like } from 'typeorm'

import studentsView from '../views/students_view'
import Student from '../models/Student'

interface Filter {
  name?: FindOperator<String>
  degreeId?: string
  classId?: string
}

export default {
  async index(request: Request, response: Response) {
    const studentsRepository = getRepository(Student)
    const { name, degreeId, classId } = request.query

    const filters: Filter = {}

    if (name) {
      filters.name = Like(`%${name}%`)
    }
    if (degreeId) {
      filters.degreeId = degreeId as string
    }
    if (classId) {
      filters.classId = classId as string
    }

    const students = await studentsRepository.find({
      relations: ['degree', 'class'],
      order: {
        id: 'DESC',
      },
      where: [filters],
    })

    return response.status(200).json({
      students: studentsView.renderMany(students),
    })
  },

  async show(request: Request, response: Response) {
    const { id } = request.params
    const { simplified } = request.query

    const studentsRepository = getRepository(Student)

    const student = await studentsRepository.findOneOrFail(id, {
      relations: ['degree', 'class'],
    })

    return response.status(200).json({
      student: studentsView.render(student, simplified === 'true'),
    })
  },

  async create(request: Request, response: Response) {
    const { ra, name, degreeId, classId } = request.body

    const studentsRepository = getRepository(Student)

    const student = studentsRepository.create({
      ra,
      name,
      degreeId,
      classId,
    })

    await studentsRepository.save(student)

    return response.status(201).json({
      message: 'Aluno cadastrado com sucesso!',
      student: studentsView.render(student),
    })
  },

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const { name, degreeId, classId } = request.body

      const studentsRepository = getRepository(Student)

      const student = await studentsRepository.findOneOrFail(id)

      student.name = name
      student.degreeId = degreeId
      student.classId = classId

      await studentsRepository.save(student)

      return response.status(201).json({
        message: 'Aluno atualizado com sucesso!',
        student: studentsView.render(student),
      })
    } catch (error) {
      return response
        .status(404)
        .json({ message: 'Não foi possível editar o aluno!' })
    }
  },
}
