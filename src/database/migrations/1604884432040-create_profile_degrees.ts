import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createProfileDegrees1604884432040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profile_degrees',
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
            name: 'profileId',
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
            name: 'ProfileDegreesProfile',
            columnNames: ['profileId'],
            referencedTableName: 'profiles',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'ProfilesDegreesDegree',
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
    await queryRunner.dropTable('profile_degrees')
  }
}
