import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  DELIVERY_MAN = 'DELIVERY_MAN',
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    
}