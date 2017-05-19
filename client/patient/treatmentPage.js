Template.treatmentPage.onRendered(function(){

    ////// NEED TO PULL PROVIDER PROFILE PICTURE FROM DB
    var imageSrc = "/images/drbrown.jpg";
    var imageHTML = "<img src=\"" + imageSrc + "\">";
    document.getElementById("imageProvider").innerHTML = imageHTML;


    // Click to open cancel request button
    $(".cancelBtn").click(function(){
        $('#reasonModal').modal('show');
    });

    // Validate cancel form
    $("#reasonForm").form({
        inline: true,
        on: "submit",
        transition: "slide down",

        // Submit cancel form - add cancel reason to database
        onSuccess: function(event, fields) {
            event.preventDefault();
            // Add cancel reason to database

            // Click to cancel request button
            $('#reasonModal').modal('hide');
            $('.cancelled-redirect').modal('show');

            // Click to return to dashboard button. Reset request
            $("#returnDashboard").click(function(){
                $('#returnDashboard').modal('hide');
                Meteor.call('resetStatus', Meteor.userId());
            });


        },
        fields: {
            reason: {
                identifier: "reason",
                rules: [
                    {
                        type: "empty",
                        prompt: "Please write a reason for canceling."
                    },{
                        type: "maxLength[350]",
                        prompt: "Please enter at most 350 characters."
                    },{
                        type: "minLength[10]",
                        prompt: "Please enter at least 10 characters."
                    }
                ]
            }
        }
    });

  var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());

	var providerId = Requests.findOne().providerId;
	Meteor.subscribe("currProvider", providerId);

    $("#confirmCancelBtn").click(function(event){
		var id = Requests.findOne()._id;
		var reason = $("#reason").innerHTML;

    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
    var willSendSMS = Profiles.findOne({email: emailAddress}).preferences;

    if (willSendSMS) {
      Meteor.call('sendSMS',{
        to: '+1' + Profiles.findOne({email: emailAddress}).phone,
        text: 'Doctors To You Update: Request Cancelled.'
      });
    }
		Meteor.call('cancelRequest', id, reason, true);
	});

    // Multi-select dropdown functionality
    $('#multi-select')
      .dropdown()
    ;
});

Template.treatmentPage.helpers({
   providerName: function(){
        var providerFullName = "";
		var isDoctor = Providers.findOne().isDoctor;

		if (isDoctor) {
            providerFullName += "Dr. ";
        }
		var providerId = Requests.findOne().providerId;
		var firstName = Profiles.findOne({_id:providerId}).firstname;
		var lastName = Profiles.findOne({_id:providerId}).lastname;

		providerFullName += firstName + " " + lastName;

		return providerFullName;
   },
   ETA: function(){
        return Requests.findOne().treatment.ETA;
   },
   patientName: function(){
		return Profiles.findOne().firstname;
   }

});
