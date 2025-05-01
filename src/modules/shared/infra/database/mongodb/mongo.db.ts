import { DataSource } from "typeorm";
import { mongodbConfig } from "./mongo.db-config";

export const mongoDatasource = new DataSource(mongodbConfig)