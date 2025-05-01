import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "infra/di/di-symbols";
import { IEventBus } from "models/interfaces/eventbus.interface";
import { AxiosError } from "axios";
import { IEventListener } from "models/interfaces/event-listener.interface";
import { sleepms } from "application/helpers";
import { extract_slugs } from "../helpers/extract_slug";
import { get_company, get_jobs } from "application/services/quickin.api";


@injectable()
export class QuickinService implements IEventListener {
  constructor(
    @inject(DI_SYMBOLS.EventBus) private eventbus: IEventBus
  ) {
    this.start_listening();
  }
  start_listening(): void {
    this.eventbus.subscribe('link.created', async payload => {
      const slug = extract_slugs(payload.link)
      // implementar scrapper por link
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
        if (retries > 5) {
          console.error(`[!] Too many retries for slug ${slug}. Skipping...`);
          break;
        }
        const page = await get_jobs({
          id: accountInfo._id,
          page: current_page,
        });

        if (page.docs.length === 0) {
          break;
        }

        page.docs.forEach(job => {
          this.eventbus.publish('job.create.request', ({
            platformJobId: job._id,
            role: job.title,
            company: accountInfo.name,
            description: job.description,
            postedAt: new Date(job.created_at),
            country: job.country,
            city: job.city,
            workplaceType: job.workplace_type,
            url: `https://jobs.quickin.io/${accountInfo.slug}/jobs/${job._id}`,
            companyLogoUrl: accountInfo.logo_media_url,
          }));
        });

        current_page++;
        total_pages = page.total;
        console.log(`[+] Fetched page ${current_page} of ${total_pages}`);
      } catch (error) {

        if (error instanceof AxiosError) {
          console.error(`[!] Error fetching page ${current_page} for slug ${slug}:`, error.response?.data || error.message);
          retries++;
        }

      } finally {
        await sleepms(exponentialBackoff());
      }
    }
  }
}