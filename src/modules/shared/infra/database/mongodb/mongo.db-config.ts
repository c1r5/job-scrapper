import { DataSourceOptions } from "typeorm";
import {JobModel} from "modules/shared/domain/models/job.model";
import { get_env } from "modules/shared/helpers/get_env";

const mongodbConfig: DataSourceOptions = {
  type: 'mongodb',
  url: get_env('MONGODB_URL'),
  database: get_env('MONGODB_DATABASE'),
  synchronize: true,
  logging: true,
  entities: [JobModel]
}

export { mongodbConfig }