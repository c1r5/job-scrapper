import { inject, injectable } from "inversify";
import { IAppRepository } from "models/interfaces/app-repository.interface";
import { DI_SYMBOLS } from "infra/di/di-symbols";
import { DataSource, Repository } from "typeorm";
import { SessionEntity } from "infra/database/entities/session.entity";

@injectable()
export class SessionRepository implements IAppRepository<SessionEntity> {
  constructor(
    @inject(DI_SYMBOLS.AppDataSource) private datasource: DataSource,
    private repository = datasource.getRepository(SessionEntity)
  ) { }

  create(item?: Partial<SessionEntity> | undefined): SessionEntity {
    if (!item) return this.repository.create();
    return this.repository.create(item);
  }

  insertMany(item?: Partial<SessionEntity>[]): Promise<SessionEntity[]> {
    if (!item) throw new Error('items not defined')

    return this.repository.save(item)
  }

  insert(item: Partial<SessionEntity>): Promise<SessionEntity> {
    return this.repository.save(item);
  }

  async find_by_id(id?: string): Promise<SessionEntity | null> {
    return this.repository.findOneBy({ id });
  }



  async find_all(): Promise<SessionEntity[]> {
    return this.repository.find();
  }

  async update(id: string, item: Partial<SessionEntity>): Promise<SessionEntity> {
    await this.repository.update(id, item);
    const updated = await this.repository.findOneBy({ id });
    if (!updated) throw new Error('session_not_found')
    return updated
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}