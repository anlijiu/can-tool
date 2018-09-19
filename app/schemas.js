import { normalize, schema } from 'normalizr'

const signalMetaItemSchema = new schema.Entity('signals', {}, { idAttribute: 'name' })
const messageMetaItemSchema = new schema.Entity('messages', {
  signals: new schema.Array(signalMetaItemSchema),
})
const messageMetaListSchema = new schema.Array(messageMetaItemSchema)

const signalItemSchema = new schema.Entity('signals', {}, { idAttribute: 'name'})
const messageItemSchema = new schema.Entity('messages', {
  signals: new schema.Array(signalItemSchema),
})
const messageListSchema = new schema.Array(messageItemSchema)


const unknownItemSchema = new schema.Entity('unknowns', {}, { idAttribute: 'id'})
const unknownListSchema = new schema.Array(unknownItemSchema)

const Schemas = {
  MESSAGE_META_ARRAY: messageMetaListSchema,
  MESSAGE_ARRAY: messageListSchema,
  MESSAGE_ITEM: messageItemSchema,
  SIGNAL_ITEM: signalItemSchema,
  UNKNOWN_MESSAGE_ARRAY: unknownListSchema
}

export default Schemas
