
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
  getClientToken: function (email, userId) {
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};
    var paymentMethodMade = Profiles.findOne({email:email}).paymentMethodMade;

    if (paymentMethodMade) {
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

  createCustomer: function (paymentNonce, patientId) {
    console.log("Fields");
    console.log(paymentNonce);

    gateway.customer.create({
      id: patientId,
      paymentMethodNonce: paymentNonce
    }, function(err, result){
      if(result){
        console.log("Success customer created");
        var email = Meteor.users.findOne({_id:patientId}).emails[0].address;
        Profiles.update({email:email},{$set: {paymentMethodMade:true}});
        console.log(Profiles.findOne({email:email}).paymentMethodMade);
      }else{
        console.log("Sucks");
      }
    });
    return;
  }
});

