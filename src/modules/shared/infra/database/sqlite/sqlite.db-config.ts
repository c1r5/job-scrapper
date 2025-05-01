import { LinkEntity } from "modules/shared/domain/models/link.model";
import { SessionEntity } from "modules/shared/domain/models/session.model";
import { DataSource } from "typeorm";

export const sqliteDatsource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  entities: [
    LinkEntity,
    SessionEntity
  ]
});