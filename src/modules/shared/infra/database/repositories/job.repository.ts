import { inject } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { DI_SYMBOLS } from '../../di/di-symbols';
import { JobEntity } from '../entities/job.entity';


export class JobRepository {
  constructor(
    @inject(DI_SYMBOLS.AppDataSource) private datasource: DataSource,
    private repository: Repository<JobEntity> = datasource.getRepository(JobEntity)
  ) {}

  async create(jobData: Partial<JobEntity>): Promise<JobEntity> {
    const job = this.repository.create(jobData);
    return await this.repository.save(job);
  }

  async findById(id: string): Promise<JobEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<JobEntity[]> {
    return await this.repository.find();
  }

  async update(id: string, jobData: Partial<JobEntity>): Promise<JobEntity | null> {
    const job = await this.findById(id);
    if (!job) return null;

    Object.assign(job, jobData);
    return await this.repository.save(job);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}