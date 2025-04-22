
export const DI_SYMBOLS = {
  AppDataSource: Symbol.for('AppDataSource'),

  LinkRepository: Symbol.for('LinkRepository'),
  JobRepository: Symbol.for('JobRepository'),
  SessionRepository: Symbol.for('SessionRepository'),
  LocationRepository: Symbol.for('LocationRepository'),
  LinkService: Symbol.for('LinkService'),

  SerpAPIService: Symbol.for('SerpAPIService'),
  JobService: Symbol.for('JobService'),
  QuickinService: Symbol.for('QuickinService'),

  AppQueue: Symbol.for('AppQueue'),
  EventBus: Symbol.for('EventBus'),
}