import axios from "axios";
import {GetJobsResponseDto} from "../dtos/get-jobs-response.dto";
import {GetCompanyResponseDTO} from "../dtos/get-company-response.dto";

const api = axios.create({
  baseURL: 'https://api.quickin.io'
})


export async function get_company(slug: string): Promise<GetCompanyResponseDTO> {
  try {
    const response = await api.get(`public/accounts/${slug}`)
    return response.data
  } catch (e) {
    throw e
  }
}

export async function get_jobs<T extends {
  id: string,
  position_category?: 'it',
  sort?: '-created_at',
  limit?: number,
  page?: number
}>(options: T): Promise<GetJobsResponseDto> {
  try {
    const response = await api.get(`/public/${options.id}/jobs`, {
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