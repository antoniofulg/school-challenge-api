import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import Class from './Class'
import RelationshipDegree from './RelationshipDegree'

@Entity('relationship_degree_classes')
export default class RelationshipDegreeClass {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  relationshipDegreeId: number

  @Column()
  classId: number

  @ManyToOne(
    () => RelationshipDegree,
    (relationshipDegree) => relationshipDegree
  )
  @JoinColumn({ name: 'relationshipDegreeId' })
  relationshipDegree: RelationshipDegree

  @ManyToOne(() => Class, (classEntity) => classEntity)
  @JoinColumn({ name: 'classId' })
  class: Class
}
