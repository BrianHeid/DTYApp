// var gateway;

// // Sets up the Braintree environment

// Meteor.startup(function () {
//   var braintree = require('braintree');
//   gateway = braintree.connect({
//     environment: braintree.Environment.Sandbox,
//     publicKey: Meteor.settings.BT_PUBLIC_KEY,
//     privateKey: Meteor.settings.BT_PRIVATE_KEY,
//     merchantId: Meteor.settings.BT_MERCHANT_ID
//   });
// });

// Meteor.methods({
//   getClientToken: function (userId) {
//     //var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);

//     var options = {};

//     if (userId) {
//       options.clientId = userId;
//     }

//     var response = gateway.clientToken.generate(options);

//     return response.clientToken;
//   },
//   createTransaction: function (data) {
//     var transaction = Meteor.wrapAsync(gateway.transaction.sale, gateway.transaction);
//     // this is very naive, do not do this in production!
//     var amount = parseInt(data.quantity, 10) * 100;

//     var response = transaction({
//       amount: amount,
//       paymentMethodNonce: data.nonce,
//       customer: {
//         firstName: data.firstName
//       }
//     });

//     // ...
//     // perform a server side action with response
//     // ...

//     return response;
//   }
// });