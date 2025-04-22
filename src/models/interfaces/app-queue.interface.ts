export type Queue<T> = Record<string, T[]>;
export type QueueHandler<T> = (queueName: string, item: T) => Promise<void>;

export interface IAppQueue<T = any> {
  enqueue(key: string, value: T): Promise<void>;
  start(key: string, handler: QueueHandler<T>): void;
  stop(): void;
}