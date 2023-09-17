// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// List of recipients and their messages
const recipients = [
  { from: '+19209456134', to: '+919358355747', body: 'Hi there' },
  { from: '+19209456134', to: '919326565154', body: 'madarchod' },
  // Add more recipients and messages here
];

// Send messages to each recipient
recipients.forEach(recipient => {
  client.messages
    .create(recipient)
    .then(message => console.log(`Message sent to ${recipient.to}: ${message.sid}`))
    .catch(error => console.error(`Error sending message to ${recipient.to}: ${error.message}`));
});
