// var button = document.querySelector('#submit-button');

//     braintree.dropin.create({
//       authorization: 'CLIENT_AUTHORIZATION',
//       container: '#dropin-container'
//     }, function (createErr, instance) {
//       button.addEventListener('click', function () {
//         instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
//           // Submit payload.nonce to your server
//         });
//       });
//     });
    
// Template.braintree.onCreated(function(){
// 	console.log("Just been created");
// });

// Template.braintree.onRendered(function(){
// 	console.log("Start on render")
// 	var clientToken = Meteor.call('getClientToken', Meteor.userId());
// 	console.log("Client Token");
// 	console.log(clientToken);

// 	braintree.setup(clientToken, 'dropin', {
// 		container: 'dropin-container' 
// 	});
// });

