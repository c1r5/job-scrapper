export interface IRepository<T> {
  create(item?: T): Promise<T>
  find_all(): Promise<T[]>
  find_by_id(id?: string): Promise<T | null>
  update(id: string, item: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}