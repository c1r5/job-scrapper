import { IAppQueue, Queue, QueueHandler } from "models/interfaces/app-queue.interface";
import * as fs from "fs/promises";


export class FileQueue<T> implements IAppQueue<T> {
  private queue: Queue<T> = {};
  private timer: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor(
    private readonly filePath: string,
    private readonly pollingInterval = 5000 // ms entre cada tentativa
  ) {
    this.ensureFile();
  }

  async enqueue(key: string, value: T): Promise<void> {
    if (!this.queue[key]) {
      this.queue[key] = [];
    }

    this.queue[key].push(value);
    await this.persist();
  }

  start(key: string, handler: QueueHandler<T>): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    this.timer = setInterval(async () => {
      if (!this.queue[key] || this.queue[key].length === 0) {
        return;
      }

      const item = this.queue[key].shift();

      if (item) {
        await handler(key, item);
        await this.persist();
      }

    }, this.pollingInterval);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.isRunning = false;
    }
  }

  private async ensureFile(): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      this.queue = JSON.parse(data) as Queue<T>;
    } catch (err: any) {
      if (err.code === "ENOENT") {
        this.queue = {};
        await this.persist();
      } else {
        throw err;
      }
    }
  }

  private async persist(): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(this.queue, null, 2), "utf-8");
  }
}