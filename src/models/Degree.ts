import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('degrees')
export default class Degree {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string
}
