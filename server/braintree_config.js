
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
});

Meteor.methods({
  getClientToken: function (email) {
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};
    var brainTreeId = Profiles.findOne({email:email}).brainTreeId;

    if (brainTreeId) {
      options.customerId = userId;
    }

    var response = generateToken(options);

    console.log("response");
   // console.log(response.clientToken);

    return response.clientToken;

  },

  createTransaction: function (data) {
    var transaction = Meteor.wrapAsync(gateway.transaction.sale, gateway.transaction);
    // This is very naive, do not do this in production!
    var amount = 0.00;

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
  },

  createCustomer: function (fields) {
    console.log("Fields");
    console.log(fields);

    return;
  }
});
>>>>>>> 0fe92a4c06331c359eaddfd95187eca4d41aeb09
