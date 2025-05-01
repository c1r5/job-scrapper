import { inject } from 'inversify';
import { DataSource } from 'typeorm';
import { IAppRepository } from 'modules/shared/domain/contracts/app-repository.interface';
import {JobModel} from "modules/shared/domain/models/job.model";
import {DI_SYMBOLS} from "modules/shared/infra/di/di-symbols";


export class JobRepository implements IAppRepository<JobModel> {
  constructor(
    @inject(DI_SYMBOLS.AppDataSource) private datasource: DataSource,
    private repository = datasource.getMongoRepository(JobModel)
  ) { }

  async find_all(): Promise<JobModel[]> {
    return await this.repository.find();
  }

  async find_by_id(id?: string | number): Promise<JobModel | null> {
    if (!id) return null;
    return await this.repository.findOneBy({ id: id as any });
  }

  create(item?: Partial<JobModel> | undefined): JobModel {
    if (!item) return this.repository.create();
    return this.repository.create(item);
  }

  insertMany(item?: Partial<JobModel>[] | undefined): Promise<JobModel[]> {
    if (!item) throw new Error('Item is required');
    return this.repository.save(item);
  }

  insert(item: Partial<JobModel>): Promise<JobModel> {
    if (!item) throw new Error('Item is required');
    const newItem = this.repository.create(item);
    return this.repository.save(newItem);
  }

  update(id: string | number, item: Partial<JobModel>): Promise<JobModel> {
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