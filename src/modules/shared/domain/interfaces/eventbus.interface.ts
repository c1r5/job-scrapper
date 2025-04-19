import { EventPayloads } from "../types/event-types";

type EventName = keyof EventPayloads;
type EventHandler<E extends EventName> = (payload: EventPayloads[E]) => void;

export interface EventBus {
  on<E extends EventName>(event: E, handler: EventHandler<E>): void
  off<E extends EventName>(event: E, handler: EventHandler<E>): void
  publish<E extends EventName>(event: E, payload: EventPayloads[E]): void
}
