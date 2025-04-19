import axios from "axios";
import { Account } from "../models";
import { JobsPage } from "../models/jobs";

const api_client = axios.create({
  baseURL: 'https://api.quickin.io'
})


export async function get_company_account(slug: string): Promise<Account> {
  try {
    const response = await api_client.get(`public/accounts/${slug}`)
    return response.data
  } catch (e) {
    throw e
  }
}

export async function get_jobs_by_company_id<T extends {
  id: string,
  position_category?: 'it',
  sort?: '-created_at',
  limit?: number,
  page?: number
}>(options: T): Promise<JobsPage> {
  try {
    const response = await api_client.get(`/public/${options.id}/jobs`, {
      params: {
        position_category: options.position_category || 'it',
        sort: options.sort || '-created_at',
        limit: options.limit || 100,
        page: options.page || 1
      }
    })

    return response.data
  } catch (e) {
    throw e
  }
}