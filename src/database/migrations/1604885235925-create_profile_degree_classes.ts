import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createProfileDegreeClasses1604885235925
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profile_degree_classes',
        columns: [
          {
            name: 'profileDegreeId',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'classId',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'ProfileDegreeClassProfileDegree',
            columnNames: ['profileDegreeId'],
            referencedTableName: 'profile_degrees',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'ProfileDegreeClassClasses',
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
    await queryRunner.dropTable('profile_degree_classes')
  }
}
