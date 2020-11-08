import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createRelationshipDegreeClasses1604810423221
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'relationship_degree_classes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'relationshipDegreeId',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'classId',
            type: 'integer',
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            name: 'RelationshipDegreeClassesRelationshipDegree',
            columnNames: ['relationshipDegreeId'],
            referencedTableName: 'relationship_degrees',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'RelationshipDegreeClassesClass',
            columnNames: ['classId'],
            referencedTableName: 'classes',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('relationship_degree_classes')
  }
}
