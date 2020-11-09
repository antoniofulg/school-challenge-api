import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import Class from './Class'
import Degree from './Degree'
import Profile from './Profile'

@Entity('profile_degrees')
export default class ProfileDegreeClass {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Profile, (profile) => profile.degrees)
  profile: Profile

  @ManyToOne(() => Degree, (degree) => degree.profiles)
  degree: Degree

  @ManyToMany(() => Class)
  @JoinTable({
    name: 'profile_degree_classes',
  })
  classes: Class[]
}
