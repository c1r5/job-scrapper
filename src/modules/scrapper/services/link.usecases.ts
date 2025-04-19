import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TypeORMError } from "typeorm";
import { DI_SYMBOLS } from "modules/shared/infra/di/di-symbols";
import { LinkRepository } from "../../shared/infra/database/repositories/link.repository";
import { EventBus } from "modules/shared/core/application/events/eventbus.contract";
import { LinkEntity } from "../../shared/infra/database/entities/link.entity";


@injectable()
export class LinkUsecases {
  constructor(
    @inject(DI_SYMBOLS.LinkRepository) private repository: LinkRepository,
    @inject(DI_SYMBOLS.EventBus) private eventbus: EventBus
  ) { }

  async createLink(links: string | string[]): Promise<void> {
    try {

      if (links instanceof Array) {
        const entities = links.map(link => {
          const entity = this.repository.create()
          entity.link = link
          return entity
        });

        const insertions = await this.repository.insertMany(entities)

        insertions.forEach(item => {
          this.eventbus.publish('link.created', item);
        })

        return
      }

      const entity = this.repository.create()

      entity.link = links

      const insertion = await this.repository.insert(entity)
      this.eventbus.publish('link.created', insertion);

    } catch (error) {
      throw error;
    }
  }

  async updateLink(id: number, link: Partial<LinkEntity>): Promise<void> {
    try {
      await this.repository.update(id, link)
      this.eventbus.publish('link.updated', link);
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new Error("Database error occurred while updating the link.");
      }
      throw error;
    }
  }

  async deleteLink(id: number): Promise<void> {
    try {
      await this.repository.delete(id)
      const linkEntity = await this.repository.find_by_id(id)
      this.eventbus.publish('link.updated', linkEntity)
    } catch (error) {
      throw error;
    }
  }
}