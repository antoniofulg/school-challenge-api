import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
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

  @ManyToOne(() => Degree, (degree) => degree)
  @JoinColumn({ name: 'degreeId' })
  degree: Degree

  @ManyToOne(() => Class, (classEntity) => classEntity)
  @JoinColumn({ name: 'classId' })
  class: Class
}
