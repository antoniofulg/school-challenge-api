import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm'
import Matter from './Matter'
import ProfileDegree from './ProfileDegree'
import Teacher from './Teacher'

@Entity('profiles')
export default class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher

  @ManyToOne(() => Matter)
  matter: Matter

  @OneToMany(() => ProfileDegree, (profileDegree) => profileDegree.profile)
  degrees: ProfileDegree
}
