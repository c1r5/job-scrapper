import "reflect-metadata";
import { container } from "infra/di";
import { DI_SYMBOLS } from "infra/di/di-symbols";
import { JobService } from "application/services";

(async () => {
  await container.setup()

  const jobService = container.get<JobService>(DI_SYMBOLS.JobService)


})();