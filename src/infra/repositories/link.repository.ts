import { DataSource } from 'typeorm';
import { inject, injectable } from 'inversify';
import { DI_SYMBOLS } from 'infra/di/di-symbols';
import { IAppRepository } from 'models/interfaces/app-repository.interface';
import { LinkEntity } from 'infra/database/entities/link.entity';

@injectable()
export class LinkRepository implements IAppRepository<LinkEntity> {

  constructor(
    @inject(DI_SYMBOLS.AppDataSource) private datasource: DataSource,
    private repository = datasource.getRepository(LinkEntity)
  ) { }

  create(item?: Partial<LinkEntity>): LinkEntity {
    return this.repository.create({ ...item })
  }

  async insertMany(items?: Partial<LinkEntity>[]): Promise<LinkEntity[]> {
    if (!items || items.length === 0) throw new Error('No items to insert');
    const newItems = this.repository.create(items);
    return await this.repository.save(newItems);
  }

  async insert(item: Partial<LinkEntity>): Promise<LinkEntity> {
    if (!item) throw new Error('No item to insert');
    const newItem = this.repository.create(item);
    return await this.repository.save(newItem);
  }

  async find_by_id(id?: number): Promise<LinkEntity | null> {
    if (!id) return null;
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, item: Partial<LinkEntity>): Promise<LinkEntity> {
    const existingLink = await this.find_by_id(id);
    if (!existingLink) {
      throw new Error('Link not found');
    }

    Object.assign(existingLink, item);
    return await this.repository.save(existingLink);
  }


  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }


  async find_all(): Promise<LinkEntity[]> {
    return await this.repository.find();
  }
}