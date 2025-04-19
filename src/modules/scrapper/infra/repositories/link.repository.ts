import { DataSource } from 'typeorm';
import { inject, injectable } from 'inversify';
import { DI_SYMBOLS } from 'modules/shared/infra/di/di-symbols';
import { LinkEntity } from 'modules/shared/infra/database/entities/link.entity';

@injectable()
export class LinkRepository {

  constructor(
    @inject(DI_SYMBOLS.AppDataSource) private datasource: DataSource,
    private repository = datasource.getRepository(LinkEntity)
  ) { }

  create(): LinkEntity {
    return this.repository.create()
  }

  async insertMany(data: Partial<LinkEntity>[]) {
    try {
      const newLinks = this.repository.create(data)
      return (await this.repository.save(newLinks))
    } catch (error) {
      throw error
    }
  }

  async insert(data: Partial<LinkEntity>): Promise<LinkEntity> {
    try {
      const newLink = this.repository.create(data);
      return (await this.repository.save(newLink));
    } catch (error) {
      throw error
    }
  }

  async find_by_id(id: number) {
    const result = await this.repository.findOneBy({ id })
    if (!result) throw new Error('link_not_found')
    return result
  }

  async update(id: number, entity: Partial<LinkEntity>): Promise<boolean> {
    try {
      const result = await this.repository.update(id, entity)
      return result.affected !== 0
    } catch (error) {
      throw error
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.repository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      throw error
    }
  }

}