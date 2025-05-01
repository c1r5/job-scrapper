import { injectable, inject } from 'inversify';
import { IAppRepository } from 'modules/shared/domain/contracts/app-repository.interface';
import { IEventListener } from 'modules/shared/domain/contracts/event-listener.interface';
import { DI_SYMBOLS } from 'modules/shared/infra/di/di-symbols';
import {IEventBus} from "modules/shared/domain/contracts/eventbus.interface";
import {JobModel} from "modules/shared/domain/models/job.model";

@injectable()
export class JobService implements IEventListener {
  constructor(
    @inject(DI_SYMBOLS.EventBus) private eventBus: IEventBus,
    @inject(DI_SYMBOLS.JobRepository) private repository: IAppRepository<JobModel>,
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