import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import ProfileDegree from './ProfileDegree'
import Student from './Student'

@Entity('degrees')
export default class Degree {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @OneToMany(() => ProfileDegree, (profileDegree) => profileDegree.degree)
  profiles: ProfileDegree[]

  @OneToMany(() => Student, (student) => student.degree)
  students: Student[]
}
