import {
  JobService,
  LinkService,
  QuickinService,
  SerpAPIService
} from "application/services"

import { LinkRepository, JobRepository, SessionRepository } from "infra/database/repositories";
import { DataSource } from "typeorm";

export const DI_SYMBOLS = {
  AppDataSource: Symbol.for(DataSource.name),

  LinkRepository: Symbol.for(LinkRepository.name),
  JobRepository: Symbol.for(JobRepository.name),
  SessionRepository: Symbol.for(SessionRepository.name),
  LinkService: Symbol.for(LinkService.name),

  SerpAPIService: Symbol.for(SerpAPIService.name),
  JobService: Symbol.for(JobService.name),
  QuickinService: Symbol.for(QuickinService.name),

  EventBus: Symbol.for('IEventBus'),
}