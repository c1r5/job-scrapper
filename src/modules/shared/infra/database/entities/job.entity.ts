import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobLocationEntity } from "./location.entity";
import { WorkType } from "modules/shared/domain/types/work-types";

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255 })
  role!: string;

  @Column({ type: 'varchar', length: 255 })
  company!: string;

  @JoinColumn({ name: 'locationId' })
  @ManyToOne(() => JobLocationEntity, { eager: true })
  location!: JobLocationEntity;

  @Column({ type: 'varchar', length: 50 })
  workType!: WorkType

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string;
}