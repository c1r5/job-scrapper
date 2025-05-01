
export const DI_SYMBOLS = {
  AppDataSource: Symbol.for('DataSource'),
  LinkRepository: Symbol.for('LinkRepository'),
  JobRepository: Symbol.for('JobRepository'),
  SessionRepository: Symbol.for('SessionRepository'),

  LinkService: Symbol.for('LinkService'),
  SerpAPIService: Symbol.for('SerpAPIService'),
  JobService: Symbol.for('JobService'),
  QuickinService: Symbol.for('QuickinService'),

  EventBus: Symbol.for('IEventBus'),
}