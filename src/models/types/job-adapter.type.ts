import { JobEntity } from "infra/database/entities/job.entity";

export type TJobAdapter<T> = (value: T) => JobEntity