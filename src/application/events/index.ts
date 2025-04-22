import { IEventListener } from "models/interfaces/event-listener.interface";
import { LocalEventBus } from "./local.eventbus";

export const localEventBus = new LocalEventBus()

export function startListeners(...args: IEventListener[]) {
  args.forEach((listener) => {
    listener.start_listening()
  })
}