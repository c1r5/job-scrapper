import { IEventBus } from "models/interfaces/eventbus.interface";
import { EventPayloads } from "models/types/event-types";
import { EventEmitter } from "stream";

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