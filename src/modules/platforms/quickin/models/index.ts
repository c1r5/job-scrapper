import { Account } from './account'
import { Doc } from './jobs'

type QuickinJob = Account & Doc & {}

export {
  Account,
  Doc,
  QuickinJob
}