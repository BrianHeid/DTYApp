Meteor.methods({
  sendSMS: function(smsFields) {
    console.log("about to send SMS...");

    var ACCOUNT_SID = 'ACe03974a912b1c7654c99d656c1e3902e';
    var AUTH_TOKEN = 'f6270ad767b46d2c27ac508bb279e7a4';
    var TWILIO_PHONE_NUMBER = '+12025686895'

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
