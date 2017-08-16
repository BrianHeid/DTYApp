//server methods
Meteor.methods({
	getCurrProviderName: function(patientId) {
		var request = Requests.findOne({patientId:patientId}, {sort: {'times.requestTime' : -1}}, {fields: {'providerId':1}});
		console.log(request.providerId);
		var providerId = request.providerId;
		console.log('Provider ID');
		console.log(providerId);
		var providerEmail = Meteor.users.findOne({_id:providerId}).emails[0].address;
		console.log("Provider Email");
		console.log(providerEmail);
		var provider = Providers.findOne({email:providerEmail});
		var providerProf = Profiles.findOne({email:providerEmail});
		var providerName = "";

		if (provider.isDoctor){
			providerName += "Dr. ";
		}

		providerName += providerProf.firstname;
		providerName += " ";
		providerName += providerProf.lastname;

		console.log("Provider Name");
		console.log(providerName); 
		return providerName;

	},

	returnStatus: function(requestId) {
		console.log("RequestId");
		console.log(requestId);
		var patientId = Requests.findOne({_id:requestId}).patientId;
		console.log("patientId");
		console.log(patientId);
		var patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;
		var status = Profiles.findOne({email:patientEmail}).status;
		var statusText;
		if (status == 1){
			statusText = "Request";
		} else if (status == 3){
			statusText = "Processing";
		} else if (status == 4){
			statusText = "Waiting for call";
		} else if (status == 6){
			statusText = "Reservation";
		} else if (status == 8){
			statusText = "Follow up 1";
		} else if (status == 10){
			statusText = "Follow up 2";
		} else if (status == 13){
			statusText = "Review";
		} else {
			statusText = "Wumbo";
		}

		return statusText;
	}
});

var isEmailValid = function(address) {
  return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(address);
};


/*
Default_login_address: postmaster@sandboxbab1a08279c84b34a1c96809281db21c.mailgun.org
Password: 7dfad06025cf2029c89f75b5c80e7b25
Mail_URL:
*/
