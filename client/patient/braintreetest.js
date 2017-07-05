
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

	console.log("Start on render")

  var promise = new Promise(function(resolve, reject) {
      Meteor.call('getClientToken', Meteor.userId(), function (err, response) {  
      if (response) {
        //console.log(response.clientToken);
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
  });
  });
	

  var clientToken = Meteor.call('getClientToken', Meteor.userId());

//  var clientToken = Session.get('clientToken');
	console.log("Client Token");
	console.log(clientToken);

	/*braintree.setup(clientToken, 'dropin', {
		container: 'dropin-container' 
	}); */
});



// Template.braintree.onRendered({
// 	braintree.setup('CLIENT-TOKEN-FROM-SERVER', 'dropin', {
//   		container: 'dropin-container'
// 	});
// });

