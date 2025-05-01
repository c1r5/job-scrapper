export type WorkplaceType = 'on-site' | 'hybrid' | 'remote';

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

