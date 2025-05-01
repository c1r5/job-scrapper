import {Container} from "inversify";
import {sqliteDatsource} from "modules/shared/infra/database/sqlite/sqlite.db-config";
import {IEventBus} from "modules/shared/domain/contracts/eventbus.interface";
import {DI_SYMBOLS} from "modules/shared/infra/di/di-symbols";
import {DataSource} from "typeorm";
import {IAppRepository} from "modules/shared/domain/contracts/app-repository.interface";
import {LinkEntity} from "modules/shared/domain/models/link.model";
import {JobModel} from "modules/shared/domain/models/job.model";
import {SessionEntity} from "modules/shared/domain/models/session.model";
import {IEventListener} from "modules/shared/domain/contracts/event-listener.interface";
import {LinkService} from "modules/scrapping/app/services/link.service";
import {JobService} from "modules/jobs/app/services/job.service";
import {QuickinService} from "modules/platforms/quickin/services/quickin.service";
import {SerpAPIService} from "modules/scrapping/app/services/serpapi.service";
import {localEventBus} from "modules/shared/app";
import {LinkRepository} from "modules/scrapping/infra/repositories/link.repository";
import {JobRepository} from "modules/jobs/infra/repositories/job.repository";
import {SessionRepository} from "modules/scrapping/infra/repositories/session.repository";

export class DiContainer {
  public DI_CONTAINER?: Container;

  constructor() { }

  async setup() {
    await sqliteDatsource.initialize()

    this.DI_CONTAINER = new Container()
    this.DI_CONTAINER.bind<IEventBus>(DI_SYMBOLS.EventBus).toConstantValue(localEventBus)
    this.DI_CONTAINER.bind<DataSource>(DI_SYMBOLS.AppDataSource).toConstantValue(sqliteDatsource)

    this.DI_CONTAINER.bind<IAppRepository<LinkEntity>>(DI_SYMBOLS.LinkRepository).to(LinkRepository)
    this.DI_CONTAINER.bind<IAppRepository<JobModel>>(DI_SYMBOLS.JobRepository).to(JobRepository)
    this.DI_CONTAINER.bind<IAppRepository<SessionEntity>>(DI_SYMBOLS.SessionRepository).to(SessionRepository)

    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.LinkService).to(LinkService)
    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.JobService).to(JobService)
    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.SerpAPIService).to(SerpAPIService)
    this.DI_CONTAINER.bind<IEventListener>(DI_SYMBOLS.QuickinService).to(QuickinService)

  }

  get<T>(identifier: symbol): T {
    if (!this.DI_CONTAINER) throw new Error('container not set')
    return this.DI_CONTAINER.get(identifier)
  }
}
