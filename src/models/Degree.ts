import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import ProfileDegree from './ProfileDegree'

@Entity('degrees')
export default class Degree {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @OneToMany(() => ProfileDegree, (profileDegree) => profileDegree.degree)
  profiles: ProfileDegree
}
