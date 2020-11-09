import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Profile from './Profile'

@Entity('matters')
export default class Matter {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @OneToMany(() => Profile, (profile) => profile.matter)
  profiles: Profile[]
}
