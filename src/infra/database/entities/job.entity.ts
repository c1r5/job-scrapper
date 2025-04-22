import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkplaceType } from "models/types/work-types";

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text' })
  role!: string;

  @Column({ type: 'text'})
  company!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  country!: string;

  @Column({ type: 'text' })
  city!: string;

  @Column({ type: 'varchar', length: 50 })
  workplaceType!: WorkplaceType

  @Column({ type: 'text', unique: true, transformer: {
    to: (value: Date) => value.toISOString(),
    from: (value: string) => new Date(value),
  }})
  postedAt!: Date;

  @Column({ type: 'text'})
  platformJobId!: string;

  @Column({ type: 'text', unique: true })
  url!: string;

  @Column({ type: 'text', nullable: true })
  companyLogoUrl?: string;
}