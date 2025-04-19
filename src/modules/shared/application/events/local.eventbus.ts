import { EventBus } from "modules/shared/domain/interfaces/eventbus.interface";
import { EventPayloads } from "modules/shared/domain/types/event-types";
import { EventEmitter } from "stream";

export class LocalEventBus implements EventBus {
  private emitter = new EventEmitter()

  on<E extends keyof EventPayloads>(event: E, handler: (payload: EventPayloads[E]) => void): void {
    this.emitter.on(event, handler)
  }
  off<E extends keyof EventPayloads>(event: E, handler: (payload: EventPayloads[E]) => void): void {
    this.emitter.off(event, handler)
  }
  publish<E extends keyof EventPayloads>(event: E, payload: EventPayloads[E]): void {
    this.emitter.emit(event, payload)
  }
}