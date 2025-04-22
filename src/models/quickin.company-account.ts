export interface Account {
  _id: string
  settings: Settings
  name: string
  slug: string
  applyfields: Applyfield[]
  social: Social
  created_at: string
  updated_at: string
  logo_media_id: LogoMediaId
  careersite: Careersite
  logo_media_url: string
  career_url: string
  cover_media_url: string
}

export interface Settings {
  gdpr: boolean
  gdpr_applicant_consent: boolean
  gdpr_privacy_notice: string
}

export interface Applyfield {
  application: string
  referral: string
  _id: string
  field: string
}

export interface Social {
  website: string
  linkedin: string
  instagram: string
}

export interface LogoMediaId {
  _id: string
  url: string
}

export interface Careersite {
  cover_media_url: string
  cover_media_id: CoverMediaId
}

export interface CoverMediaId {
  _id: string
  url: string
}
