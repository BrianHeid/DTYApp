var gateway;

// Sets up the Braintree environment

Meteor.startup(function () {
  gateway = BrainTreeConnect({
    //If you set an ENV variable for PRODUCTION you can dynamically change out sandbox and production
    environment: process.env.PRODUCTION && Braintree.Environment.Production || Braintree.Environment.Sandbox,
    merchantId: Meteor.settings.BT_MERCHANT_ID,
    publicKey:  Meteor.settings.BT_PUBLIC_KEY,
    privateKey: Meteor.settings.BT_PRIVATE_KEY
  });

  console.log(Meteor.settings.BT_MERCHANT_ID);
  console.log(Meteor.settings.BT_PUBLIC_KEY);
  console.log(Meteor.settings.BT_PRIVATE_KEY);
 /* var braintree = require("braintree");
  gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    publicKey: Meteor.settings.BT_PUBLIC_KEY,
    privateKey: Meteor.settings.BT_PRIVATE_KEY,
    merchantId: Meteor.settings.BT_MERCHANT_ID
  }); */
});

Meteor.methods({
  getClientToken: function (userId) {

    console.log("Server side token generation");
    console.log(userId);
    var options = {};
    var response = "bubbles";

    if (userId) {
      options.clientId = userId;
    }

    var promise = new Promise(function(resolve, reject) {
      gateway.clientToken.generate({}, function (err, response) {
       // console.log(response.clientToken);
      if (response) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });
    });

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
      return result;
    }, function(err) {
      console.log(err); // Error: "It broke"
      return err;
    });

  /*  gateway.clientToken.generate({}, function (err, response) {
      console.log(response.clientToken);
      answer = response.clientToken;
      }); */

  },

  createTransaction: function (data) {
    var transaction = Meteor.wrapAsync(gateway.transaction.sale, gateway.transaction);
    // This is very naive, do not do this in production!
    var amount = parseInt(data.quantity, 10) * 100;

    var response = transaction({
      amount: amount,
      paymentMethodNonce: data.nonce,
      customer: {
        firstName: data.firstName
      }
    });

    // ...
    // perform a server side action with response
    // ...

    return response;
  }
});