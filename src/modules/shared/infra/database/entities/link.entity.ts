import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('links')
export class LinkEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number
  @Column({ unique: true, type: 'varchar', length: 100 })
  link!: string
}