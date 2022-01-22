require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
})

exports.main = (req, res) => {
    if (req.body.type === "url_verification") {;
        res.status(200).json({
            challenge: req.body.challenge
        });
        return;
    }

    app.client.chat.postMessage({
        channel: process.env.CHANNEL_FOR_COLLECTION,
        text: 'hello',
    }).then(() => {
        // res.status(200).send('Success');
    }).catch(err => {
        // console.error(err);
        // res.status(400).send('Fail');
    })
};