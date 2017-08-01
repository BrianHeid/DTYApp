/*Template.braintree.onRendered({
	braintree.setup('CLIENT-TOKEN-FROM-SERVER', 'dropin', {
  		container: 'dropin-container'
	});
});*/

 /*   var button = document.querySelector('#submit-button');

    braintree.dropin.create({
      authorization: 'CLIENT_AUTHORIZATION',
      container: '#dropin-container'
    }, function (createErr, instance) {
      button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
          // Submit payload.nonce to your server
        });
      });
    });
    */
Template.braintree.onCreated(function(){
	console.log("Just been created");
});

Template.braintree.onRendered(function(){

	console.log("Start on render");

  var emailAddress = "bwh520@gmail.com";

  Meteor.call('getClientToken', emailAddress, function (err, response) {  
    if (response) {
      console.log("It worked!")
      console.log(response);
      braintree.setup(response, 'dropin', {
        container: 'dropin-container',
        onPaymentMethodReceived: function (data) {
          Meteor.call('createCustomer', data.nonce);  
          console.log("Go!");  
        }
      }); 
    }
    else {
      console.log("It broke");
      console.log(err);
    }
  });

});

	

//  Meteor.call('getClientToken', Meteor.userId(), (response, err));

//  var clientToken = Session.get('clientToken');
//	console.log("Client Token");
//	console.log(clientToken);

	/*braintree.setup(clientToken, 'dropin', {
		container: 'dropin-container' 
	}); */



// Template.braintree.onRendered(function(){
// 	console.log("Start on render")
// 	var clientToken = Meteor.call('getClientToken', Meteor.userId());
// 	console.log("Client Token");
// 	console.log(clientToken);


// 	braintree.setup(clientToken, 'dropin', {
// 		container: 'dropin-container' 

// Template.braintree.onRendered({
// 	braintree.setup('CLIENT-TOKEN-FROM-SERVER', 'dropin', {
//   		container: 'dropin-container'

// 	});
// });

