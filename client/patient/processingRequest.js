Template.processingRequestPage.onRendered(function(){

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
			var reason = fields.reason;
			// Click to cancel request button
			$('#reasonModal').modal('hide');
			$('.cancelled-redirect').modal('show');

			// Click to return to dashboard button. Reset request
			$("#returnDashboard").click(function(){
				$('#returnDashboard').modal('hide');

			patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;			
			Meteor.call('cancelRequest', Profiles.findOne({email:patientEmail}).currRequest, reason, false);
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
});

Template.processingRequestPage.helpers({
	getFirstName: function(){
		var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		return Profiles.findOne({email: emailAddress}).firstname;
	}

});
