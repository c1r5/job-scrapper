import { inject } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { DI_SYMBOLS } from '../../di/di-symbols';
import { JobEntity } from '../entities/job.entity';
import { IAppRepository } from 'models/interfaces/app-repository.interface';


export class JobRepository implements IAppRepository<JobEntity> {
  constructor(
    @inject(DI_SYMBOLS.AppDataSource) private datasource: DataSource,
    private repository: Repository<JobEntity> = datasource.getRepository(JobEntity)
  ) { }

  async find_all(): Promise<JobEntity[]> {
    return await this.repository.find();
  }

  async find_by_id(id?: string | number): Promise<JobEntity | null> {
    if (!id) return null;
    return await this.repository.findOneBy({ id: id as any });
  }

  create(item?: Partial<JobEntity> | undefined): JobEntity {
    if (!item) return this.repository.create();
    return this.repository.create(item);
  }

  insertMany(item?: Partial<JobEntity>[] | undefined): Promise<JobEntity[]> {
    if (!item) throw new Error('Item is required');
    return this.repository.save(item);
  }

  insert(item: Partial<JobEntity>): Promise<JobEntity> {
    if (!item) throw new Error('Item is required');
    return this.repository.save(item);
  }

  update(id: string | number, item: Partial<JobEntity>): Promise<JobEntity> {
    if (!id) throw new Error('Id is required');
    if (!item) throw new Error('Item is required');
    return this.repository.save({ ...item, id: id as any });
  }

  async delete(id: string | number): Promise<void> {
    if (!id) throw new Error('Id is required');
    return this.repository.delete(id as any).then(() => {
      return;
    });
  }
}