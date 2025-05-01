import { mongoDatasource } from "modules/shared/infra/database/mongodb/mongo.db";

import { DataSource } from "typeorm";
import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {JobRepository} from "modules/jobs/infra/repositories/job.repository";
import {JobModel} from "modules/shared/domain/models/job.model";

describe('jobs repository test suite', () => {
  let datasource: DataSource
  let jobRepository: JobRepository

  beforeAll(async () => {
    datasource = await mongoDatasource.initialize()
    jobRepository = new JobRepository(datasource)
  })

  afterAll(async () => {
    if (datasource.isInitialized) {
      await datasource.initialize()
    }
  })

  it ('should get records', async ()  => {
    await expect(jobRepository.find_all()).resolves.toBeInstanceOf(Array<JobModel>);
  })
})