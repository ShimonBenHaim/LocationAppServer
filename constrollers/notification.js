const webpush = require('web-push');


let USER_SUBSCRIPTIONS = [];

const vapidKeys = {
    "publicKey":"BM17fVhQ2uuLQXDKHG05krqnuXAli9nqBpq2fLx7grFTV4mFNZAWGrDkVq7rdRm-MT7_YwANt8e5vLaxE7Qj2Hk",
    "privateKey":"jc0y8nbU-aGrPfz3vx7SDbCRBtfJYWlt9aA7ipwx5ns"
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


exports.addPushSubscriber = (req, res) => {
    const sub = req.body;
 //   console.log(sub);
  //  console.log('Received Subscription on the server: ', sub);
    USER_SUBSCRIPTIONS.push(sub);
    res.status(200).json({message: "Subscription added successfully."});
}

exports.sendNewsletter = (req, res) => {
  //  console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);
    // sample notification payload
    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };


    Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });

    }