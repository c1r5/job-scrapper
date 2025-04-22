import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocationEntity } from "./location.entity";
import { WorkType } from "models/types/work-types";

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255 })
  role!: string;

  @Column({ type: 'varchar', length: 255 })
  company!: string;

  @Column({ type: 'text' })
  description!: string;

  @JoinColumn({ name: 'locationId' })
  @ManyToOne(() => LocationEntity, { eager: true })
  location!: LocationEntity;

  @Column({ type: 'varchar', length: 50 })
  workType!: WorkType

  @Column({ type: 'text' })
  postedAt!: string;
}