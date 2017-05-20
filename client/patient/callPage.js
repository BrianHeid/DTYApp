Template.callPage.onRendered(function(){
	// Click to open cancel request button
	$(".cancelBtn").click(function(){
		$('#reasonModal').modal('show');
	});

	// Validate cancel form
	$("#reasonForm").form({
		inline: true,
		on: "change",
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

				// Process cancellation payment using stored billing info
				Meteor.call('getClientToken', function(error, clientToken) {
					if (error) {
						console.log(error);
					}
					else {
						var client = new braintree.api.Client({clientToken: token});
						var fee = '10.00';
						client.tokenizeCard({
							number: Profiles.findOne({email: emailAddress}).cardNumber,
							expirationDate: '10/20'
					}, function (err, nonce) {
						// Send nonce to your server
						Meteor.call('createTransaction', nonce, fee, function(error, success) {
							if (error) {
								throw new Meteor.Error('transaction-creation-failed');
							} else {
								console.log("Payment Received")
							}
						});
					});

						//remove the used billing info
						Meteor.call('removeBillingInfo', Meteor.user());
					}
				});


				var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
				var willSendSMS = Profiles.findOne({email: emailAddress}).preferences;

				if (willSendSMS) {
					Meteor.call('sendSMS',{
						to: '+1' + Profiles.findOne({email: emailAddress}).phone,
						text: 'Doctors To You Update: Request Cancelled.'
					});
				}

				Meteor.call('sendEmail',{
					to: Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address,
					from: 'no-reply@doctorstoyouapp.com',
					subject: 'Doctors To You: Request canceled',
					text: '',
					html:"Your request has been canceled. Please visit <a href='care.doctorstoyou.com'>care.doctorstoyou.com</a> to make a new request.\n\nSincerely,\n the Doctors To You care team"
				});

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
		Meteor.call('cancelRequest', id, reason, false);
	});
});

Template.callPage.helpers({
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

	timeEstimate: function(){
		return Requests.findOne().times.callStartTime;
	}
});
