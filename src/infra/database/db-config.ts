import { DataSource } from "typeorm";
import { JobEntity } from "./entities/job.entity";
import { LinkEntity } from "./entities/link.entity";
import { LocationEntity } from "./entities/location.entity";
import { SessionEntity } from "./entities/session.entity";

export const appDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  entities: [
    JobEntity,
    LinkEntity,
    LocationEntity,
    SessionEntity
  ]
});