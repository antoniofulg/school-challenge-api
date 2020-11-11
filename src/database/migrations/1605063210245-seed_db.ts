import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import Class from '../../models/Class'
import Degree from '../../models/Degree'
import Matter from '../../models/Matter'
import { ClassesSeed, DegreesSeed } from '../seeds/classes.seed'

export class seedDb1605063210245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const classesRepository = getRepository(Class)
    await classesRepository.save(ClassesSeed)
    const degreesRepository = getRepository(Degree)
    await degreesRepository.save(DegreesSeed)
    const mattersRepository = getRepository(Matter)
    await mattersRepository.save(DegreesSeed)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
