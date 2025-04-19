import { Container } from "inversify";
import { DI_SYMBOLS } from "./di-symbols";
import { DataSource } from "typeorm";
import { LinkUsecases, SerpAPIService } from "modules/scrapper";
import { LinkRepository } from "modules/scrapper/infra/repositories";
import { appDataSource } from "../database";
import { JobRepository } from "../database/repositories/job.repository";
import { localEventBus, JobService } from "modules/shared/application";
import { EventBus } from "modules/shared/domain/interfaces/eventbus.interface";
import { IRepository } from "modules/shared/domain/interfaces/app-repository.interface";
import { SessionRepository } from "modules/scrapper/infra/repositories/session.repository";
import { SessionEntity } from "../database/entities/session.entity";

export class DiContainer {
  public DI_CONTAINER?: Container;

  constructor() { }

  async setup() {
    await appDataSource.initialize()

    this.DI_CONTAINER = new Container()
    this.DI_CONTAINER.bind<EventBus>(DI_SYMBOLS.EventBus).toConstantValue(localEventBus)
    this.DI_CONTAINER.bind<DataSource>(DI_SYMBOLS.AppDataSource).toConstantValue(appDataSource)

    this.DI_CONTAINER.bind<LinkRepository>(DI_SYMBOLS.LinkRepository).to(LinkRepository)
    this.DI_CONTAINER.bind<JobRepository>(DI_SYMBOLS.JobRepository).to(JobRepository)
    this.DI_CONTAINER.bind<IRepository<SessionEntity>>(DI_SYMBOLS.SessionRepository).to(SessionRepository)

    this.DI_CONTAINER.bind<LinkUsecases>(DI_SYMBOLS.LinkUsecases).to(LinkUsecases)

    this.DI_CONTAINER.bind<JobService>(DI_SYMBOLS.JobService).to(JobService)
    this.DI_CONTAINER.bind<SerpAPIService>(DI_SYMBOLS.SerpAPIService).to(SerpAPIService)
  }

  get<T>(identifier: symbol): T {
    if (!this.DI_CONTAINER) throw new Error('container not set')
    return this.DI_CONTAINER.get(identifier)
  }
}
