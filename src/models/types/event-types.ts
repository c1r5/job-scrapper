import { JobEntity } from "infra/database/entities/job.entity";
import { LinkEntity } from "infra/database/entities/link.entity";
import { ScrappingOptions } from "../scrapping-options";
import { JobDTO } from "models/dtos/job.dto";
import { NotificationDTO } from "models/dtos/notification.dto";


export interface EventPayloads {
  'notification.request': NotificationDTO;
  'google.scrapping.request': ScrappingOptions;
  'scrapping.started': any;
  'scrapping.error': any;
  'scrapping.finished': any;
  'link.create.request': string | string[];
  'link.created': Partial<LinkEntity>;
  'link.updated': Partial<LinkEntity>;
  'link.deleted': { linkId: number };
  'job.created': Partial<JobEntity>;
  'job.updated': Partial<JobEntity>;
  'job.deleted': { jobId: string };
  'job.create.request': JobDTO;
  'job.create.error': any;
}