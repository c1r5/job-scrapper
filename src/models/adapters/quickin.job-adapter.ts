import { JobEntity } from "infra/database/entities/job.entity";
import { IJobAdapter } from "models/interfaces/job-adapter.interface";
import { Account } from "models/quickin.company-account";
import { Doc } from "models/quickin.job-response";

export type QuickinJob = Account & Doc;

export const quickinJobAdapter: IJobAdapter<QuickinJob> = (job: QuickinJob): JobEntity => {
  return JobEntity.create({
    role: job.title,
    company: job.name,
    description: job.description,
    postedAt: job.created_at,
    location: {
      country: job.country,
      city: job.city
    },
    workType: job.workplace_type,
  })
}