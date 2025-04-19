import axios, { AxiosError } from 'axios';
import { SerpApiResponse } from '../models';
import { SerpAPIOptions } from '../models/serpapi-options';
import { sleepms } from 'modules/shared';
import { inject, injectable } from 'inversify';
import { DI_SYMBOLS } from 'modules/shared/infra/di/di-symbols';
import { LinkUsecases } from './link.usecases';
import { IRepository } from 'modules/shared/domain/interfaces/app-repository.interface';
import { SessionEntity } from 'modules/shared/infra/database/entities/session.entity';

export interface SearchStats {
  errors: number,
  links: number,
  retries: number
}

export interface ServiceOptions {
  query: string,
  delay?: number,
  sessionId?: string
}

@injectable()
export class SerpAPIService {
  private readonly baseUrl: string = 'https://serpapi.com/search.json';
  private apiKey?: string
  private stats: SearchStats = {
    errors: 0,
    links: 0,
    retries: 0
  }

  constructor(
    @inject(DI_SYMBOLS.LinkUsecases) private link_usecases: LinkUsecases,
    @inject(DI_SYMBOLS.SessionRepository) private session_repository: IRepository<SessionEntity>
  ) { }

  set api_key(key: string) {
    this.apiKey = key
  }

  async search(options: SerpAPIOptions) {
    try {
      const response = await axios.get<SerpApiResponse>(this.baseUrl, {
        params: {
          ...options,
          api_key: this.apiKey
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error during SerpAPI search:', error);
      throw error;
    }
  }

  async start(options: ServiceOptions): Promise<void> {
    let startIndex = 0;
    let exponential_delay = options.delay || 2000
    let session = await this.session_repository.find_by_id(options.sessionId)

    if (!session) {
      session = await this.session_repository.create()
      session.query = options.query
      session.last_index = startIndex
      session.save()
    }

    startIndex = session.last_index

    while (true) {
      try {
        console.log(`Fetching results starting at index: ${startIndex}`);

        const results = await this.search({
          device: 'desktop',
          engine: 'google',
          google_domain: 'google.com',
          start: session.last_index,
          q: session.query
        });
        if (!results.organic_results) {
          console.log('No more results. Exiting loop.');
          break;
        }

        if (!results.serpapi_pagination) {
          console.log('No more pages. Exiting loop.');
          break;
        }

        if (!results.serpapi_pagination.next_link) {
          console.log('No more pages. Exiting loop.');
          break;
        }

        startIndex += 10;

        session.last_index = startIndex

        await session.save()
        await this.link_usecases.createLink(results.organic_results.map(r => r.link))

        this.stats.links += results.organic_results.length

      } catch (error) {
        this.stats.errors++

        if (error instanceof AxiosError) {
          console.log(`Tentativa ${this.stats.retries + 1} falhou. Retentando em ${exponential_delay}ms...`);
          exponential_delay = exponential_delay * Math.pow(2, this.stats.retries)
        }

      } finally {
        await sleepms(exponential_delay)
        this.stats.retries++
      }
    }
  }
}