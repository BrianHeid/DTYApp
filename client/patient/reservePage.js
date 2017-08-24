Template.reservePage.onRendered(function(){
  console.log("Start on render")
  var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;

  Meteor.call('getClientToken', emailAddress, Meteor.userId(), function (err, response) {  
    if (response) {
      console.log("It worked!")
      console.log(response);
      braintree.setup(response, 'dropin', {
        container: 'dropin-container',
        onPaymentMethodReceived: function (data) {
          Meteor.call('createCustomer', data.nonce, Meteor.userId());  
          Meteor.call('setStatusTreatment', Meteor.userId());  
        }
      }); 
    }
    else {
      console.log("It broke");
      console.log(err);
    }
  });

  $('#paymentForm')
  .form({
    fields: {
      fullName     : 'empty',
      street   : 'empty',
      city : 'empty',
      state : 'empty',
      zipcode   : 'empty',
      agree    : 'checked'
    }
  });

  $('#reserve').prop('disabled', true);
  // Click consent modal
  $("#consent").click(function(){
    $('#provide-care').modal({
      autofocus: false, // Prevents the dropdown menu from dropping automatically
    }).modal('show');
  });

    // Click HIPAA modal
  $("#hipaa").click(function(){
    $('#hipaa-modal').modal({
      autofocus: false, // Prevents the dropdown menu from dropping automatically
    }).modal('show');
  });

});

Template.reservePage.events({
  'submit #paymentForm': function(event){
   // event.preventDefault();
    FlowRouter.go('/dashboard');
    console.log("submitted");
  }
});

/*$(document).ready(function(){

  $("#consent").click(function(){
    $('#provide-care').modal({
      autofocus: false, // Prevents the dropdown menu from dropping automatically
    }).modal('show');
  });

  // Click HIPAA modal
  $("#hipaa").click(function(){
    $('#hipaa-modal').modal({
      autofocus: false, // Prevents the dropdown menu from dropping automatically
    }).modal('show');
  });



  // Makes submit button disabled, needs to check the I Agree toggle first
  document.getElementById("reserve").disabled = true; 
});*/

// Allows dropdown function to work
$('.ui.dropdown').dropdown();

// Nag functionality
$('.nag').nag('show');