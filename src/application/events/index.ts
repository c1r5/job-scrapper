import { IEventListener } from "models/interfaces/event-listener.interface";
import { LocalEventBus } from "./local.eventbus";

const localEventBus = new LocalEventBus()

function startListeners(...args: IEventListener[]) {
  args.forEach((listener) => {
    listener.start_listening()
  })
}

export default {
  startListeners,
  localEventBus
}