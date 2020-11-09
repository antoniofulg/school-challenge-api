import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createProfiles1604809638408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
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
            name: 'teacherId',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'matterId',
            type: 'integer',
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            name: 'ProfilesTeacher',
            columnNames: ['teacherId'],
            referencedTableName: 'teachers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'ProfilesMatter',
            columnNames: ['matterId'],
            referencedTableName: 'matters',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles')
  }
}
