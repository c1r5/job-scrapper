import { IJobAdapter, Job } from "modules/shared/core/application/contracts/job.adapter";
import { QuickinJob } from "../models/types";

export class QuickinJobAdapter implements IJobAdapter<QuickinJob> {
  from(value: QuickinJob): Job {
    return {
      role: value.title,
      company: value.name,
      location: {
        country: value.country,
        city: value.city
      },
      workType: value.workplace_type
    }
  }
}