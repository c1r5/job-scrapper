export interface IAppRepository<T> {
  find_all(): Promise<T[]>
  find_by_id(id?: string | number): Promise<T | null>
  create(item?: Partial<T>): T
  insertMany(item?: Partial<T>[]): Promise<T[]>
  insert(item: Partial<T>): Promise<T>
  update(id: string | number, item: Partial<T>): Promise<T>
  delete(id: string | number): Promise<void>
}