import { normalize, schema } from 'normalizr'

const signalItemSchema = new schema.Entity('signals', {}, { idAttribute: 'name' })
const messageItemSchema = new schema.Entity('messages', {
  signal: new schema.Array(signalItemSchema),
})
const messageListSchema = new schema.Array(messageItemSchema)

const Schemas = {
  MESSAGE_ARRAY: messageListSchema,
  MESSAGE_ITEM: messageItemSchema,
  SIGNAL_ITEM: signalItemSchema,
}

export default Schemas
