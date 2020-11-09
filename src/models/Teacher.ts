import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import Profile from './Profile'

@Entity('teachers')
export default class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @OneToOne(() => Profile, (profile) => profile.teacher)
  profile: Profile
}
