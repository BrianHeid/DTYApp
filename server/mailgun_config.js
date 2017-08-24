
Meteor.startup(function () {
  process.env.MAIL_URL = "smtp://postmaster%40mail.doctorstoyou.com:d165a4d4f5c6c7b8353b0c3309607c32@smtp.mailgun.org:587";
});


Meteor.methods({
  sendEmail: function (mailFields) {
      console.log("about to send email...");
      check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: mailFields.to,
        from: mailFields.from,
        subject: mailFields.subject,
        text: mailFields.text
      });

      console.log("email sent!");
  }
});
