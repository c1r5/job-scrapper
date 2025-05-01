import { EventEmitter } from "stream";
import {EventPayloads, IEventBus} from "modules/shared/domain/contracts/eventbus.interface";

export class LocalEventBus implements IEventBus {
  private emitter = new EventEmitter()

  subscribe<E extends keyof EventPayloads>(event: E, handler: (payload: EventPayloads[E]) => void): void {
    this.emitter.on(event, handler)
  }
  unsubscribe<E extends keyof EventPayloads>(event: E, handler: (payload: EventPayloads[E]) => void): void {
    this.emitter.off(event, handler)
  }
  publish<E extends keyof EventPayloads>(event: E, payload: EventPayloads[E]): void {
    this.emitter.emit(event, payload)
  }
}