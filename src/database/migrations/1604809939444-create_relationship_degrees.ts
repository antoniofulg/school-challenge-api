import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createRelationshipDegrees1604809939444
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'relationship_degrees',
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
            name: 'relationshipId',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'degreeId',
            type: 'integer',
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            name: 'RelationshipDegreesRelationship',
            columnNames: ['relationshipId'],
            referencedTableName: 'relationships',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'RelationshipDegreesDegree',
            columnNames: ['degreeId'],
            referencedTableName: 'degrees',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('relationship_degrees')
  }
}
