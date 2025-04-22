import axios, { AxiosError } from 'axios';
import { inject, injectable } from 'inversify';
import { DI_SYMBOLS } from 'infra/di/di-symbols';
import { IAppRepository } from 'models/interfaces/app-repository.interface';
import { IEventBus } from 'models/interfaces';
import { IEventListener } from 'models/interfaces/event-listener.interface';
import { ScrappingOptions } from 'models/scrapping-options';
import { sleepms } from 'application/helpers';
import { SessionEntity } from 'infra/database/entities/session.entity';
import { SerpApiResponse } from 'models';
import { SerpAPIOptions } from 'models/serpapi-options';

export interface SearchStats {
  errors: number,
  links: number,
  retries: number
}

@injectable()
export class SerpAPIService implements IEventListener {
  private readonly baseUrl: string = 'https://serpapi.com/search.json';
  private apiKey?: string
  private stats: SearchStats = {
    errors: 0,
    links: 0,
    retries: 0
  }

  constructor(
    @inject(DI_SYMBOLS.EventBus) private eventbus: IEventBus,
    @inject(DI_SYMBOLS.SessionRepository) private session_repository: IAppRepository<SessionEntity>
  ) { this.start_listening() }

  start_listening(): void {
    this.eventbus.subscribe('google.scrapping.request', async (payload: ScrappingOptions) => { })
  }

  stop_listening(): void {
    this.eventbus.unsubscribe('google.scrapping.request', async (payload: ScrappingOptions) => { })
  }

  set_api_key(key: string): this {
    this.apiKey = key
    return this
  }

  private async search(options: SerpAPIOptions) {
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

  async start(options: ScrappingOptions): Promise<void> {
    let startIndex = 0;
    let exponential_delay = options.delay || 2000
    let session = await this.session_repository.find_by_id(options.sessionId)

    if (!session) {
      session = this.session_repository.create()
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
        // await this.link_usecases.createLink(results.organic_results.map(r => r.link))

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