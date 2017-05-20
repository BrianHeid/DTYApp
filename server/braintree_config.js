// Define gateway variable
var gateway;

Meteor.startup(function () {
  var env;
  // Pick Braintree environment based on environment defined in Meteor settings.
  if (Meteor.settings.public.env === 'Production') {
    env = Braintree.Environment.Production;
  } else {
    env = Braintree.Environment.Sandbox;
  }
  // Initialize Braintree connection:
  gateway = BrainTreeConnect({
    environment: env,
    publicKey: Meteor.settings.public.BT_PUBLIC_KEY,
    privateKey: Meteor.settings.private.BT_PRIVATE_KEY,
    merchantId: Meteor.settings.public.BT_MERCHANT_ID
  });
});

Meteor.methods({
  getClientToken: function (clientId) {
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};

    if (clientId) {
      options.clientId = clientId;
    }

    var response = generateToken(options);
    return response.clientToken;
  },
 createTransaction: function(nonceFromTheClient, customerInfo, fee) {
   var user = Meteor.user();

   // Let's create transaction.
   gateway.transaction.sale({
     amount: fee, //'10.00',
     paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
     options: {
       submitForSettlement: true, // Payment is submitted for settlement immediately
     }
   }, function (err, success) {
     if (err) {
       console.log(err);
     } else {
       // When payment's successful, add "paid" role to current user.
       console.log("Payment successful");
     }
   });
}
});
