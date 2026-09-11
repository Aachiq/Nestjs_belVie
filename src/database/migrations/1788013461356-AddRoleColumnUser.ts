import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumnUser1788013461356 implements MigrationInterface {
    name = 'AddRoleColumnUser1788013461356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('USER', 'ADMIN', 'DELIVERY_MAN') NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
