import dotenv = require('dotenv')
import { Request, Response } from 'express'
import { App } from '@slack/bolt'

dotenv.config()

if (!process.env.SLACK_BOT_USER_OAUTH_TOKEN) {
  throw new Error('No SLACK_BOT_USER_OAUTH_TOKEN')
}

if (!process.env.SLACK_BOT_USER_OAUTH_TOKEN) {
  throw new Error('No SLACK_SIGNING_SECRET')
}

if (process.env.CHANNEL_FOR_COLLECTION == null) {
  throw new Error('No CHANNEL_FOR_COLLECTION')
}

const app = new App({
  token: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})

exports.main = (req: Request, res: Response) => {
  if (req.body.type === 'url_verification') {
        
    res.status(200).json({
      challenge: req.body.challenge
    })
    return
  }

  if (!process.env.CHANNEL_FOR_COLLECTION) return

  app.client.chat.postMessage({
    channel: process.env.CHANNEL_FOR_COLLECTION,
    text: 'hello',
  })
}