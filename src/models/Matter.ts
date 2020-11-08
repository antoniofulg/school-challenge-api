import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('matters')
export default class Matter {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string
}
