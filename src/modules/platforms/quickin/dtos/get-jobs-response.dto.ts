export interface GetJobsResponseDto {
  docs: Doc[],
  total: number,
  limit: number,
  page: number,
  pages: number
}

export interface Doc {
  _id: string
  publicate: string
  title: string
  description: string
  requirements: string
  city: string
  region: string
  country: string
  position_category: string
  workplace_type: 'hybrid' | 'remote' | 'on-site'
  code: string
  application_questions: ApplicationQuestion[]
  career_url: string
  benefits: string
  contract_id: ContractId
  company_id: CompanyId
  created_at: string
}

export interface ApplicationQuestion {
  required: boolean
  options: any[]
  _id: string
  label: string
  type: string
}

export interface ContractId {
  _id: string
  name: string
}

export interface CompanyId {
  _id: string
  name: string
}
