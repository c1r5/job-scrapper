import { createWriteStream } from "fs";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "modules/shared/infra/di/di-symbols";
import { get_company_account, get_jobs_by_company_id } from "./client";
import { Readable } from "typeorm/platform/PlatformTools";
import { extract_slugs } from "../helpers";
import { JobService } from "modules/shared/application";
import { EventBus } from "modules/shared/application/events/eventbus.contract";

export interface QuickinOptions {
  slug: string,
  page: number
}

@injectable()
export class QuickinService {
  options: any;
  constructor(
    @inject(DI_SYMBOLS.JobService) private job_service: JobService,
    @inject(DI_SYMBOLS.EventBus) private eventbus: EventBus
  ) {
    this.eventbus.on('link.created', async (payload) => {
      const slug = extract_slugs(payload.link)
      await this.start(slug)
    })
  }

  async get_jobs(options: QuickinOptions) {
    const account = await get_company_account(options.slug);

    const jobs = await get_jobs_by_company_id({
      id: account._id,
      page: options.page
    })

    const readable = Readable.from(jobs.docs)


  }

  async start(slug: string) {
    let total_pages = 0
    let current_page = 1
    console.log('[+] new slug:', slug)
    // const account = await get_account_by_company_slug(this.options.company)
    // const writer = createWriteStream(this.options.output_raw, { encoding: 'utf-8', flags: 'a' })

    // while (true) {
    //   try {
    //     const jobs = await get_jobs_by_company_id({
    //       id: account._id,
    //       page: current_page
    //     })

    //     // 1. Remove duplicadas
    //     const removeDuplicadas = new Transform({
    //       objectMode: true,
    //       transform(chunk, _enc, callback) {
    //         if (saved_jobs.includes(chunk)) {
    //           return callback(); // ignora vaga já salva
    //         }

    //         callback(null, chunk);
    //       }
    //     });

    //     const readable = Readable.from(jobs.docs.map(job => JSON.stringify(job) + '\n'));

    //     await pipelineAsync(
    //       readable,
    //       removeDuplicadas,
    //       writer
    //     );

    //     console.log(`✅ Página ${current_page} processada com ${jobs.docs.length} vagas.`);

    //     current_page++

    //     if (current_page > total_pages) {
    //       break
    //     }

    //     await sleepms(5000)
    //   } catch (error) {
    //     continue
    //   }
    // }

    // writer.end();
    // console.log('✅ Scraping finalizado!');
  }
}