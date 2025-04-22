import { JobEntity } from "infra/database/entities/job.entity";

export type IJobAdapter<T> = (value: T) => JobEntity