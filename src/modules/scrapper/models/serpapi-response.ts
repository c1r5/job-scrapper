export interface SerpApiResponse {
  length: number
  search_metadata: SearchMetadata
  search_parameters: SearchParameters
  search_information: SearchInformation
  organic_results: OrganicResult[]
  pagination: Pagination
  serpapi_pagination: SerpapiPagination
}

export interface SearchMetadata {
  id: string
  status: string
  json_endpoint: string
  created_at: string
  processed_at: string
  google_url: string
  raw_html_file: string
  total_time_taken: number
}

export interface SearchParameters {
  engine: string
  q: string
  location_requested: string
  location_used: string
  google_domain: string
  hl: string
  gl: string
  device: string
}

export interface SearchInformation {
  query_displayed: string
  total_results: number
  time_taken_displayed: number
  organic_results_state: string
}

export interface OrganicResult {
  position: number
  title: string
  link: string
  redirect_link: string
  displayed_link: string
  favicon: string
  snippet: string
  snippet_highlighted_words?: string[]
  source: string
}

export interface Pagination {
  current: number
  next?: string
  other_pages?: Record<string, string>
}

export interface SerpapiPagination {
  current: number
  next_link?: string
  next?: string
  other_pages?: Record<string, string>
}

