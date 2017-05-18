Meteor.methods({
  sendSMS: function(smsFields) {
    console.log("about to send SMS...");

    var ACCOUNT_SID = 'AC36df726375aa8ed532b11a8ddd75bc4a';
    var AUTH_TOKEN = 'e3e8776a0e3a27d1f1c0d0ee9acf5c0e';
    var TWILIO_PHONE_NUMBER = '+16178588481'

    var twilio = Twilio(ACCOUNT_SID, AUTH_TOKEN);
    twilio.sendSms({
      to: smsFields.to, // Any number Twilio can deliver to
      from: TWILIO_PHONE_NUMBER, // A number you bought from Twilio and can use for outbound communication
      body: smsFields.text // body of the SMS message
    },

    function(err, responseData) { //this function is executed when a response is received from Twilio
      if (!err) { // "err" is an error received during the request, if any
      // "responseData" is a JavaScript object containing data received from Twilio.
      // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
      // http://www.twilio.com/docs/api/rest/sending-sms#example-1
      console.log("SMS sent successfully");
    }
  });
}
});
