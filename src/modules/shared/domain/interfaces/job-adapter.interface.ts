import { WorkType } from "modules/shared/domain/types/work-types"

export interface Location {
  country: string,
  city: string
}
export interface Job {
  role: string,
  company: string,
  location: Location,
  workType: WorkType
}

export interface IJobAdapter<T> {
  from(value: T): Job
}