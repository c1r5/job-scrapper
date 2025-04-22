import "reflect-metadata";
import { container } from "infra/di";
import { DI_SYMBOLS } from "infra/di/di-symbols";
import { LinkService, SerpAPIService, QuickinService, JobService } from "application/services";
import { get_env } from "application/helpers";
import { localEventBus } from "application/events";

(async () => {
  await container.setup()

  container.get<SerpAPIService>(DI_SYMBOLS.SerpAPIService)
    .set_api_key(get_env('API_KEY'))
  // .start({
  //   query: "site:jobs.quickin.io inurl:/jobs"
  // })
  container.get<QuickinService>(DI_SYMBOLS.QuickinService)
  container.get<JobService>(DI_SYMBOLS.JobService)

  const linkService = container.get<LinkService>(DI_SYMBOLS.LinkService)
  const links = await linkService.getLinks()

  links.forEach(link => {
    localEventBus.publish('link.created', link)
  })
  
})();