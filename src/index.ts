import { App, ExpressReceiver } from '@slack/bolt'

const { SLACK_BOT_USER_OAUTH_TOKEN, SLACK_SIGNING_SECRET, CHANNEL_FOR_COLLECTION } = process.env

if (!SLACK_BOT_USER_OAUTH_TOKEN) {
  throw new Error('No SLACK_BOT_USER_OAUTH_TOKEN')
}

if (!SLACK_SIGNING_SECRET) {
  throw new Error('No SLACK_SIGNING_SECRET')
}

if (CHANNEL_FOR_COLLECTION == null) {
  throw new Error('No CHANNEL_FOR_COLLECTION')
}

const receiver = new ExpressReceiver({
  signingSecret: SLACK_SIGNING_SECRET,
  endpoints: '/',
  processBeforeResponse: true,
})

const app = new App({
  token: SLACK_BOT_USER_OAUTH_TOKEN,
  receiver,
  processBeforeResponse: true,
})

app.message(async ({ client, event }) => {

  if (event.subtype === 'message_changed' || event.subtype === 'message_deleted' || event.channel === CHANNEL_FOR_COLLECTION) {
    return
  }

  console.log('get permalink')

  const permalinkRes = await client.chat.getPermalink({
    channel: event.channel,
    message_ts: event.event_ts
  })

  if (!permalinkRes.ok || permalinkRes.permalink == null) {
    console.error('No permalink')
    return
  }

  console.log('post permalink')

  app.client.chat.postMessage({
    channel: CHANNEL_FOR_COLLECTION,
    text: permalinkRes.permalink,
  })
})

exports.main = receiver.app