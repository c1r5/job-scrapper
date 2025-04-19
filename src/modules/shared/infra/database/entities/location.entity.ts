import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('locations')
export class JobLocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  country!: string;

  @Column({ type: 'varchar', length: 100 })
  state!: string;
}