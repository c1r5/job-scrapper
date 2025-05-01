import { JobModel } from "modules/shared/domain/models/job.model";

export type TJobAdapter<T> = (value: T) => JobModel