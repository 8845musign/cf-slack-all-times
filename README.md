# Cloud Functions slack all times

A Slack message aggregation bot that runs on Cloud Functions.
## Setup

1. https://api.slack.com/app
2. Create New App / From scratch
3. copy Signing Secret
4. go OAuth & Permissions
5. Add an OAuth Scope, channels:history, chat:write, chat:write.customize, users:read
6. Install to Workspace
7. copy Bot User OAuth Token
8. go Event Subscriptions
9. Subscribe to bot events
10. Add Bot User Event, message.channels
11. create .env.yaml
12. code deploy `npm run deploy`
13. copy url
14. go Event Subscriptions
15. enter the URL you copied in Request URL
16. invite bot to your channel(receive and send)

### `.env.yaml`

```
CHANNEL_FOR_COLLECTION: {your aggregation channel ID}
SLACK_BOT_USER_OAUTH_TOKEN: {your Bot User OAuth Token}
SLACK_SIGNING_SECRET: {your Signing Secret}
```
