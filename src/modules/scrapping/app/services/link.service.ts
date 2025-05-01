import "reflect-metadata";
import {inject, injectable} from "inversify";
import {TypeORMError} from "typeorm";
import {DI_SYMBOLS} from "modules/shared/infra/di/di-symbols";
import {IEventListener} from "modules/shared/domain/contracts/event-listener.interface";
import {IAppRepository} from "modules/shared/domain/contracts/app-repository.interface";
import {LinkEntity} from "modules/shared/domain/models/link.model";
import {IEventBus} from "modules/shared/domain/contracts/eventbus.interface";

@injectable()
export class LinkService implements IEventListener {
  constructor(
    @inject(DI_SYMBOLS.LinkRepository) private repository: IAppRepository<LinkEntity>,
    @inject(DI_SYMBOLS.EventBus) private eventbus: IEventBus
  ) { this.start_listening() }

  start_listening(): void {
    this.eventbus.subscribe('link.create.request', async (event) => { })
  }
  stop_listening(): void {
    this.eventbus.unsubscribe('link.create.request', async (event) => { })
  }

  async createLink(links: string | string[]): Promise<void> {
    try {
      if (Array.isArray(links)) {
        const entities = links.map(link => this.repository.create({ link }))
        const insertions = await this.repository.insertMany(entities)
        insertions.forEach(link => {
          this.eventbus.publish('link.created', link);
        });

        return;
      }

      const entity = this.repository.create({ link: links })
      const insertion = await this.repository.insert(entity)
      this.eventbus.publish('link.created', insertion);
      return;

    } catch (error) {
      throw error;
      /**
       * TODO: Handle error
       */
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

      if (linkEntity) {
        this.eventbus.publish('link.updated', linkEntity)
      }
    } catch (error) {
      throw error;
    }
  }

  async getLinks(): Promise<LinkEntity[]> {
    try {
      return await this.repository.find_all();
    } catch (error) {
      throw error;
    }
  }
}