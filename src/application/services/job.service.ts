import { injectable, inject } from 'inversify';
import { IAppRepository } from 'models/interfaces/app-repository.interface';
import { IEventListener } from 'models/interfaces/event-listener.interface';
import { IEventBus } from 'models/interfaces/eventbus.interface';
import { DI_SYMBOLS } from 'infra/di/di-symbols';
import { JobEntity } from 'infra/database/entities/job.entity';

@injectable()
export class JobService implements IEventListener {
  constructor(
    @inject(DI_SYMBOLS.EventBus) private eventBus: IEventBus,
    @inject(DI_SYMBOLS.JobRepository) private repository: IAppRepository<JobEntity>,
  ) { this.start_listening() }

  start_listening(): void {
    this.eventBus.subscribe('job.create.request', async payload => {
      const savedJob = await this.repository.insert(payload);
      this.eventBus.publish('job.created', savedJob);
    })
  }

  stop_listening(): void {
    this.eventBus.unsubscribe('job.create.request', async payload => { })
  }
}