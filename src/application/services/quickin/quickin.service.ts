import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "infra/di/di-symbols";
import { IEventBus } from "models/interfaces/eventbus.interface";
import { IAppQueue } from "models/interfaces/app-queue.interface";
import { Readable } from "stream";
import { AxiosError } from "axios";
import { IEventListener } from "models/interfaces/event-listener.interface";
import { sleepms } from "application/helpers";
import { quickinJobAdapter } from "models/adapters/quickin.job-adapter";
import { extract_slugs } from "./helpers/extract_slug";
import { get_company, get_jobs } from "application/services/http/quickin.api";


@injectable()
export class QuickinService implements IEventListener {
  private readonly queueName = 'quickin.queue';

  constructor(
    @inject(DI_SYMBOLS.AppQueue) private queue: IAppQueue<string>,
    @inject(DI_SYMBOLS.EventBus) private eventbus: IEventBus
  ) {
    this.start_listening();
    this.queue.start(this.queueName, async (queue, slug) => {
      if (queue !== this.queueName) return;

      console.log('[+] Processing slug', slug);
      await this.scrapeAllPages(slug);
      console.log('[+] Finished processing slug', slug);
    });

  }
  start_listening(): void {
    this.eventbus.subscribe('link.created', async payload => {
      const slug = extract_slugs(payload.link)
      if (!slug) return
      await this.queue.enqueue(this.queueName, slug)
    });
  }
  stop_listening(): void {
    this.eventbus.unsubscribe('link.created', async payload => {
      console.log('[-] Stopping listener for slug', payload.link);
    });
  }

  async scrapeAllPages(slug: string): Promise<void> {
    let current_page = 0;
    let total_pages = 0;
    let retries = 0;
    let delay = 1000;
    let exponentialBackoff = () => delay * Math.pow(2, retries);

    const accountInfo = await get_company(slug)

    while (total_pages === 0 || current_page < total_pages) {
      try {
        const page = await get_jobs({
          id: accountInfo._id,
          page: current_page,
        });

        if (page.docs.length === 0) {
          break;
        }

        const jobs = page.docs.map(job => quickinJobAdapter(Object.assign(accountInfo, job)));

        const jobStreams = Readable.from(jobs);

        for await (const job of jobStreams) {
          this.eventbus.publish('job.create.request', job);
        }

        current_page++;
        total_pages = page.total;
        console.log(`[+] Fetched page ${current_page} of ${total_pages}`);
      } catch (error) {

        if (error instanceof AxiosError) {
          console.error(`[!] Error fetching page ${current_page} for slug ${slug}:`, error.message);
          retries++;
        }

      } finally {
        await sleepms(exponentialBackoff());
      }
    }
  }
}