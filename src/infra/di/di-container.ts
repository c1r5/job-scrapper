import { Container } from "inversify";
import { DI_SYMBOLS } from "./di-symbols";
import { DataSource } from "typeorm";
import { appDataSource } from "../database";
import { IEventBus } from "models/interfaces/eventbus.interface";
import { IAppRepository } from "models/interfaces/app-repository.interface";
import { SessionEntity } from "../database/entities/session.entity";
import { LinkEntity } from "../database/entities/link.entity";
import { JobEntity } from "../database/entities/job.entity";
import { SessionRepository } from "infra/database/repositories/session.repository";
import { JobRepository } from "../database/repositories/job.repository";
import { IEventListener } from "models/interfaces/event-listener.interface";
import { localEventBus } from "application/events";
import { LinkService, JobService, SerpAPIService, QuickinService } from "application/services";
import { LinkRepository } from "infra/database/repositories";
import { NotificationService } from "application/services/core/notify.service";

export class DiContainer {
  public DI_CONTAINER?: Container;

  constructor() { }

  async setup() {
    await appDataSource.initialize()

    this.DI_CONTAINER = new Container()
    this.DI_CONTAINER.bind<IEventBus>(DI_SYMBOLS.EventBus).toConstantValue(localEventBus)
    this.DI_CONTAINER.bind<DataSource>(DI_SYMBOLS.AppDataSource).toConstantValue(appDataSource)

    this.DI_CONTAINER.bind<IAppRepository<LinkEntity>>(DI_SYMBOLS.LinkRepository).to(LinkRepository)
    this.DI_CONTAINER.bind<IAppRepository<JobEntity>>(DI_SYMBOLS.JobRepository).to(JobRepository)
    this.DI_CONTAINER.bind<IAppRepository<SessionEntity>>(DI_SYMBOLS.SessionRepository).to(SessionRepository)

    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.LinkService).to(LinkService)
    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.JobService).to(JobService)
    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.SerpAPIService).to(SerpAPIService)
    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.QuickinService).to(QuickinService)
    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.NotificationService).to(NotificationService)

  }

  get<T>(identifier: symbol): T {
    if (!this.DI_CONTAINER) throw new Error('container not set')
    return this.DI_CONTAINER.get(identifier)
  }
}
