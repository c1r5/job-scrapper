import { injectable, inject } from 'inversify';
import { EventBus } from 'modules/shared/domain/interfaces/eventbus.interface';
import { JobRepository } from 'modules/shared/infra/database/repositories/job.repository';
import { DI_SYMBOLS } from 'modules/shared/infra/di/di-symbols';

@injectable()
export class JobService {
  constructor(
    @inject(DI_SYMBOLS.JobRepository) private repository: JobRepository,
    @inject(DI_SYMBOLS.EventBus) private eventBus: EventBus
  ) { }

  async createJob(jobData: any): Promise<void> {
    const job = await this.repository.create(jobData);
    this.eventBus.publish('job.created', job);
  }

  async getJobById(jobId: string): Promise<any> {
    return this.repository.findById(jobId);
  }

  async updateJob(jobId: string, jobData: any): Promise<void> {
    const updatedJob = await this.repository.update(jobId, jobData);
    if (!updatedJob) throw new Error('job update error')

    this.eventBus.publish('job.updated', updatedJob);
  }

  async deleteJob(jobId: string): Promise<void> {
    await this.repository.delete(jobId);
    this.eventBus.publish('job.deleted', { jobId });
  }
}