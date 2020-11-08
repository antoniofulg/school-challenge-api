import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('teachers')
export default class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string
}
