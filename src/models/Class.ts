import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('classes')
export default class Class {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string
}
