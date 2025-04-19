import { LinkEntity } from "modules/shared/infra/database/entities/link.entity";
import { JobEntity } from "../../../infra/database/entities/job.entity";

// core/event-bus/EventTypes.ts
export interface EventPayloads {
  'scrapping.started': any
  'scrapping.error': any,
  'scrapping.finished': any,

  'link.created': Partial<LinkEntity>;
  'link.updated': Partial<LinkEntity>;
  'link.deleted': { linkId: number };

  'job.created': Partial<JobEntity>;
  'job.updated': Partial<JobEntity>;
  'job.deleted': { jobId: string };
}