const request = require('request');

exports.slack = (req, res) => {

    request.post({
        uri: "",
        headers: { 'Content-type': 'application/json' },
        json: { 'text': 'こんにちは' }
    }, function (err, res, body) {
        res.send(200);
        console.log(err, res, body);
    });

    res.status(200).send('Success');
};