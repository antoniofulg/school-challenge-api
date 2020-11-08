import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import Matter from './Matter'
import Teacher from './Teacher'

@Entity('relationships')
export default class Relationship {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Teacher, (teacher) => teacher)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher

  @ManyToOne(() => Matter, (matter) => matter)
  @JoinColumn({ name: 'matterId' })
  class: Matter
}
