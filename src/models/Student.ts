import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Class from './Class'
import Degree from './Degree'

@Entity('students')
export default class Student {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  ra: number

  @Column()
  name: string

  @Column()
  degreeId: number

  @Column()
  classId: number

  @ManyToOne(() => Degree)
  degree: Degree

  @ManyToOne(() => Class)
  class: Class
}
