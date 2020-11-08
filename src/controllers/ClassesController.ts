import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import classesView from '../views/classes_view'
import Class from '../models/Class'

export default {
  async index(request: Request, response: Response) {
    try {
      const classesRepository = getRepository(Class)

      const classes = await classesRepository.find({
        relations: ['students'],
      })

      return response.status(200).json({
        message: 'Turmas encontradas!',
        classes: classesView.renderMany(classes),
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: error,
      })
    }
  },

  async create(request: Request, response: Response) {
    const { name } = request.body

    const classesRepository = getRepository(Class)

    const classEntity = classesRepository.create({
      name,
    })

    await classesRepository.save(classEntity)

    return response.status(201).json({
      message: 'Classe cadastrada com sucesso!',
      class: classesView.render(classEntity),
    })
  },
}
