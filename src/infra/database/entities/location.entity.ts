import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { JobEntity } from "./job.entity";

@Entity('locations')
export class LocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  country!: string;

  @Column({ type: 'varchar', length: 100 })
  city!: string;

  @OneToMany(() => JobEntity, (job) => job.location)
  jobs!: JobEntity[];
}