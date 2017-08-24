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

	addProfile: function(email,firstname,lastname) {
		Profiles.insert({
			email: email,
			createdAt: new Date().toLocaleString(),
			firstname: firstname,
			lastname: lastname,
			preferences: true,
			paymentMethodMade: false,
			currRequest: "0"
		},{removeEmptyStrings: false});
	},

	pushRequest: function(id, info, requesterName){

        var address = info.street + ' ' + info.aptNumSuite + ' ' + info.city + ' ' + info.activeStates + ' ' + info.zipcode;

		var times = {requestTime: new Date().toLocaleString(), callStartTime: "", callEndTime: "", callDuration: 0, reservedTime: ""};

		var treatment = {requestId: "", isHouseCall: true, providerName: "", datetime: "", duration: 0, endTime: "", ETA: "", address: ""};
		var followups = [{}];
		var files = {patientId: id, requestId: "", medicalReport: undefined, invoice: undefined};
		var emailAddress = Meteor.users.findOne({_id:id}).emails[0].address;

		var phoneStrip = info.phonenumber.replace('(', "").replace(')', "").replace(' ', '').replace('-', '');
		var phoneNum = parseInt(phoneStrip);

		if(info.for_someone_else){
			var firstname = info.tempPatientFirstName;
			var lastname = info.tempPatientLastName;
			var forSomeoneElse = true;
		} else {
			var firstname = Profiles.findOne({email: emailAddress}).firstname;
			var lastname = Profiles.findOne({email: emailAddress}).lastname;
			var forSomeoneElse = false;
		}

		Requests.insert({
			"patientId": id,
			"requestForSomeoneElse": forSomeoneElse,
			"relationship": info.relationship,
			"requesterName": requesterName,
			"firstname": firstname,
			"lastname": lastname,
			"address": address,
			"times": times,
			"symptoms": info.symptoms,
			"treatment": treatment,
			"cardEnd": 0000,
			"followups": followups,
			"files": files,
			"cancelReason": "",
			"cancelAfterReserve": false,
			"requestComplete": false,
			"accepted": false,
			"providerId": "",
			"readyForPayment": false,
			"gender" : info.gender,
			"phone" : phoneNum,
			"birthday" : info.birthday,
			"status" : 3
		},{removeEmptyStrings: false}, function(error, result){
			Meteor.call('changeCurrRequest', id, result);
			console.log("result");
			console.log(result);
			return true;
		});

	},

	setStatusProcessingRequest: function(patientId){
		Meteor.call('updateStatus', patientId, 3);
	},

	setStatusCall: function(patientId){
		Meteor.call('updateStatus', patientId, 4);
	},

	setStatusReserve: function(patientId){
		Meteor.call('updateStatus', patientId, 6);
	},

	setStatusTreatment: function(patientId){
		Meteor.call('updateStatus', patientId, 8);
	},

	setStatusFollowup: function(patientId){
		Meteor.call('updateStatus', patientId, 10);
	},

	setStatusFollowup2: function(patientId){
		Meteor.call('updateStatus', patientId, 11);
	},

	setStatusReview: function(patientId){
		Meteor.call('updateStatus', patientId, 13);
	},

	seStatusReview2: function(patientId){
		Meteor.call('updateStatus', patientId, 14);
	},

	resetStatus: function(id){
		Meteor.call('updateStatus', id, 1);
	},

	updateStatus: function(id, status){
		Requests.update({patientId:id},{$set: {status:status}});
	},

	returnStatusNum: function(patientId){
		if(patientId){
			console.log(patientId);
			emailAddress = Meteor.users.findOne({_id:patientId}).emails[0].address;
			currentRequest = Profiles.findOne({email:emailAddress}).currRequest;
			console.log(currentRequest);
			if (currentRequest != ""){
				status = Requests.findOne({_id:currentRequest}).status;
				console.log('returnStatus');
				console.log(status);
				return status; 
			}
			else {
				return 1;
			}
		} else {
			return 0;
		}
	},

	changeCurrRequest: function(patientId, requestId){
		if(Requests.findOne({_id:requestId})){
			console.log("changeCurrRequest");
			console.log(requestId);
			patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;
			Profiles.update({email:patientEmail},{$set: {'currRequest':requestId}});
		}
		else{
			console.log("Curr Request Not Changed");
		}
	},

	requestComplete: function(patientId, requestId){
		console.log("Getting to the method");
		Requests.update({_id:requestId}, {$set: {'requestComplete':true}});
		Meteor.call('resetStatus', patientId);
	},

	cancelRequest: function(requestId, cancelReason, cancelAfterReserve){
		console.log("RequestID cancelRequest");
		console.log(requestId);
		patientId = Requests.findOne({_id:requestId}).patientId;
		patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;
		Requests.update({_id: requestId}, {$set: {'cancelReason': cancelReason, 'cancelAfterReservation': cancelAfterReserve, 'requestComplete':true}});
		Profiles.update({email:patientEmail}, {$set: {'currRequest':"0"}});
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
