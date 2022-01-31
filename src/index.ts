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

app.message(async ({ payload, client, event, message }) => {
  if (event.subtype === 'message_changed' || event.subtype === 'message_deleted' || event.channel === CHANNEL_FOR_COLLECTION) {
    return
  }

  console.log('get user info')

  // eslint-disable-next-line
  // @ts-ignore
  const user = payload.user as string 
  
  // eslint-disable-next-line
  // @ts-ignore
  const text = message.text as string

  const userInfo = await client.users.info({
    user
  })

  console.log('get permalink')

  const permalinkRes = await client.chat.getPermalink({
    channel: event.channel,
    message_ts: event.event_ts
  })

  if (permalinkRes.error || permalinkRes.permalink == null) {
    throw new Error('No permalink')
  }

  console.log('post permalink')

  app.client.chat.postMessage({
    username: userInfo.user?.profile?.real_name,
    icon_url: userInfo.user?.profile?.image_48,
    channel: CHANNEL_FOR_COLLECTION,
    text: `${text}\n<${permalinkRes.permalink}|Original message>`,
    mrkdwn: true,
    unfurl_links: false
  })
})

exports.main = receiver.app