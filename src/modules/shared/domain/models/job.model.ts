import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";
import {WorkplaceType} from "modules/jobs/domain/dtos/job.dto";

@Entity('jobs')
export class JobModel extends BaseEntity {
  @ObjectIdColumn()
  id!: string

  @Column({type: "string"})
  role!: string;

  @Column({type: "string"})
  company!: string;

  @Column({type: "string"})
  description!: string;

  @Column({type: "string"})
  country!: string;

  @Column({type: "string"})
  city!: string;

  @Column({type: "string"})
  postedAt!: Date;

  @Column({type: "string"})
  workplaceType!: WorkplaceType

  @Column({type: "string"})
  platformJobId!: string;

  @Column({type: "string"})
  url!: string;

  @Column({type: "string"})
  companyLogoUrl?: string;
}