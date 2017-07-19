Template.reservePage.onRendered(function(){
	console.log("Start on render")
  var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;

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

  $("#myonoffswitch").click(function(){
    $('#billing-form').toggle();
  });

});

Template.reservePage.events({
  'submit #paymentForm': function(event){
   // event.preventDefault();
    FlowRouter.go('/dashboard');
    console.log("submitted");
  }
});

$(document).ready(function(){
  $("#billing-form").hide();
  $("#time-form").hide();

  // Click billing address toggle
  $("#myonoffswitch").click(function(){
    $('#billing-form').toggle();
  });

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

  // Click to reserve button
/*  $("#reserve").click(function(){
    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
    var willSendSMS = Profiles.findOne({email: emailAddress}).preferences;
    Meteor.subscribe("currProfile", emailAddress);
    Meteor.subscribe("currRequest", Meteor.userId());

    var providerId = Requests.findOne({patientId:Meteor.userId()}).providerId;
    Meteor.subscribe("currProvider", providerId);

    var providerEmail = Meteor.users.findOne({_id:providerId}).emails[0].address;
    var providerName = Profiles.findOne({email:providerEmail}).lastName;

    // send SMS if user has that preference
    if (willSendSMS) {
      Meteor.call('sendSMS',{
        to: '+1' + Profiles.findOne({email: emailAddress}).phone,
        text: 'Doctors To You Update: Reservation Made with ' + providerName;
      });
    } 



    var form = document.forms[0];

    // store billing info **DELETED AFTER USED FOR PAYMENT**


    $('#success').show(500);  // Reveals in 500 milliseconds
    event.preventDefault();   // Prevents from page refreshing on submit

    var name = Profiles.findOne({email: emailAddress}).firstname;

    var providerId = Requests.findOne().providerId;
    Meteor.subscribe("currProvider", providerId);

    var providerEmail = Meteor.users.findOne({_id:providerId}).emails[0].address;

    var provider = Profiles.findOne({email:providerEmail}).lastName;

    var type = "";
    var housecall = Requests.findOne().treatment.isHouseCall;
    if (housecall) {
      type += "house call";
    } else {
      type += "phone consultation";
    }

    var ETA = Requests.findOne().treatment.ETA;

    Meteor.call('sendEmail',{
      to: emailAddress,
      from: 'no-reply@doctorstoyouapp.com',
      subject: 'Doctors To You: Reservation made',
      text:,
      html:"Dear " + name +", <br><br>You have successfully reserved Dr. "+provider+" for a "+ type+". Your provider will arrive at approximately "+ETA+". Check <a href='care.doctorstoyou.com'>care.doctorstoyou.com</a> for the most recent update."
    }); 

  }); 

  // Makes submit button disabled, needs to check the I Agree toggle first
  document.getElementById("reserve").disabled = true; */
});

// Allows dropdown function to work
$('.ui.dropdown').dropdown();

// Nag functionality
$('.nag').nag('show');