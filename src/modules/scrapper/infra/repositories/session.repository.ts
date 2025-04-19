import { inject, injectable } from "inversify";
import { IRepository } from "modules/shared/domain/interfaces/app-repository.interface";
import { SessionEntity } from "modules/shared/infra/database/entities/session.entity";
import { DI_SYMBOLS } from "modules/shared/infra/di/di-symbols";
import { DataSource, Repository } from "typeorm";

@injectable()
export class SessionRepository implements IRepository<SessionEntity> {
  constructor(
    @inject(DI_SYMBOLS.AppDataSource) private datasource: DataSource,
    private repository = datasource.getRepository(SessionEntity)
  ) { }

  async find_by_id(id?: string): Promise<SessionEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(item?: SessionEntity): Promise<SessionEntity> {
    let entity = item ? this.repository.save(item) : this.repository.create()
    return entity
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