import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import Class from './Class'
import RelationshipDegree from './RelationshipDegree'

@Entity('relationship_degree_classes')
export default class RelationshipDegreeClass {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(
    () => RelationshipDegree,
    (relationshipDegree) => relationshipDegree
  )
  @JoinColumn({ name: 'relationshipId' })
  relationshipDegree: RelationshipDegree

  @ManyToOne(() => Class, (classEntity) => classEntity)
  @JoinColumn({ name: 'classId' })
  class: Class
}
