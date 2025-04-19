import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('scrapping_sessions')
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('numeric')
  last_index!: number

  @Column({type: 'varchar', length: 200})
  query!: string
}