import "reflect-metadata";
import { container } from "modules/shared/infra/di";
import { get_env } from "modules/shared/helpers/get_env";
import { DI_SYMBOLS } from "modules/shared/infra/di/di-symbols";
import { SerpAPIService } from "modules/scrapper/services/serpapi.service";

(async () => {
  await container.setup()

  const serpapi_service = container.get<SerpAPIService>(DI_SYMBOLS.SerpAPIService)

  serpapi_service.api_key = get_env('API_KEY')
  serpapi_service.start({
    query: 'site:jobs.quickin.io inurl:/jobs',
    sessionId: 'fcb9dc99-1b07-4d2c-ae6e-a3d75a4d93d9'
  })
})();