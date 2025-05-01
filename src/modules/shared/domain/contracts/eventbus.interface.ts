import {ScrappingOptionsDTO} from "modules/scrapping/app/dtos/scrapping-options.dto";
import {LinkEntity} from "modules/shared/domain/models/link.model";
import {JobModel} from "modules/shared/domain/models/job.model";
import {JobDTO} from "modules/jobs/domain/dtos/job.dto";

type EventName = keyof EventPayloads;
type EventHandler<E extends EventName> = (payload: EventPayloads[E]) => void;

export interface EventPayloads {
  'scrapping.request': ScrappingOptionsDTO;
  'scrapping.started': any;
  'scrapping.error': any;
  'scrapping.finished': any;
  'link.create.request': string | string[];
  'link.created': Partial<LinkEntity>;
  'link.updated': Partial<LinkEntity>;
  'link.deleted': { linkId: number };
  'job.created': Partial<JobModel>;
  'job.updated': Partial<JobModel>;
  'job.deleted': { jobId: string };
  'job.create.request': JobDTO;
  'job.create.error': any;
}

export interface IEventBus {
  subscribe<E extends EventName>(event: E, handler: EventHandler<E>): void
  unsubscribe<E extends EventName>(event: E, handler: EventHandler<E>): void
  publish<E extends EventName>(event: E, payload: EventPayloads[E]): void
}
