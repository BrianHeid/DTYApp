Meteor.startup(function(){
  Meteor.Mailgun.config({
    username: 'postmaster@sandboxc325b32bfc38422ea41238133f509d15.mailgun.org',
    password: 'ff6851dffef29d15f252de3ae979c60c'
  });
});

// In your server code: define a method that the client can call
Meteor.methods({
  sendEmail: function (mailFields) {
      console.log("about to send email...");
      check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Meteor.Mailgun.send({
          to: mailFields.to,
          from: mailFields.from,
          subject: mailFields.subject,
          text: mailFields.text,
          html: mailFields.html
      });
      console.log("email sent!");
  }
});
