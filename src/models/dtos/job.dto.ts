import { WorkplaceType } from "models/types/work-types";

export interface JobDTO {
  role: string;
  company: string;
  description: string;
  postedAt: Date;
  country: string;
  city: string;
  workplaceType: WorkplaceType;
  url: string;
  platformJobId: string;
  companyLogoUrl?: string;
}

