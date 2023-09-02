const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSms(body){
   await client.messages
  .create({
    body: body,
    to: '+213 665 68 43 62', 
    from: '+213 673 64 77 02'
  })
}
module.exports = sendSms;