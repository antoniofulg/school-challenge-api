import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import Degree from './Degree'
import Relationship from './Relationship'

@Entity('relationship_degrees')
export default class RelationshipDegree {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  relationshipId: number

  @Column()
  degreeId: number

  @ManyToOne(() => Relationship, (relationship) => relationship)
  @JoinColumn({ name: 'relationshipId' })
  relationship: Relationship

  @ManyToOne(() => Degree, (degree) => degree)
  @JoinColumn({ name: 'degreeId' })
  class: Degree
}
