/*
	Meteor methods for updating Meteor.users
	 to setName, setPhone, setBirthday, and setAddress.
	 */

//export const test = new Mongo.collections('test')

import { Email } from 'meteor/email'
import  './collections.js'


Meteor.methods({

	//////////////////////////////////// USER FUNCTIONS ////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	getEmail: function(id) {
		return Meteor.users.findOne({_id:id}).emails[0].address;
	},

	checkValidEmail: function(email) {
		var ret = Meteor.users.findOne({'emails.address':email});
		if (ret == undefined) {
			return true;
		}
		return false;
	},

	addPatientEmail: function(email) {
		PatientEmails.insert({
			email: email
		});
	},

	addProfile: function(email,firstname,lastname,phonenumber,address,birthday,gender) {
		Profiles.insert({
			email: email,
			createdAt: new Date().toLocaleString(),
			firstname: firstname,
			lastname: lastname,
			phone: phonenumber,
			address: address,
			birthday: birthday,
			gender: gender,
			preferences: true
		},{removeEmptyStrings: false});
	},

	addPatient: function(id) {
		Patients.insert({
			_id: id,
			billing: '',
			history: {
				requests: [],
				treatments: [],
				followups: [],
				reviews: []
			}
		},{removeEmptyStrings: false});
	},
/**
	sendEmail: function (to, from, subject, text) {
		check([to, from, subject, text], [String]);
	    // Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    this.unblock();
	    Email.send({
	    	to: to,
	    	from: from,
	    	subject: subject,
	    	text: text
	    });
	},
	**/

	pushRequest: function(id, info){
		// pushes patient request into Requests collection
		account = Meteor.users.find(id).fetch()[0]
		firstName = account.profile.firstname
		lastName = account.profile.lastname
		email = account.emails[0].address

		info.firstName = firstName
		info.lastName = lastName
		info.email = email

		if (Requests.find({_id:id}).fetch().length > 0){
			Requests.update(id, {$set: {
				'info':info,
				"datetime": new Date().toLocaleString(),
				"profile":account.profile,
				"treated": false,
				"accepted": false
			}})

		}
		else{
			Requests.insert({_id:id,
				'info':info,
				"datetime": new Date().toLocaleString(),
				"treated": false,
				"accepted": false,
				"profile":account.profile})
			Meteor.users.update(id, {$inc: {'profile.status':1}})
		}

	},

	getClients: function(){
		return Meteor.users.find().fetch()
	},

	findClient: function(id){
		return Meteor.users.find({_id: id}).fetch()
	},

	updateProfile: function(id, address, phonenumber, birthday){
		Meteor.users.update(id, {$set: {
			'profile.address': address,
			'profile.phonenumber': phonenumber,
			'profile.birthdate': birthday
		}})
	},

	updateCurStep: function(id, view){
		Meteor.users.update(id, {$set: {'profile.curStep': view}});
	},

	updateStatus: function(id, status){
		Meteor.users.update(id, {$set: {'profile.status': status}});
	},

	updateView: function(id, view){
		var status = Meteor.users.find({_id: id}).fetch()[0].profile.status;
		switch(view){
			case 'Request':
				if (status == 1) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Request'}});
				} else {
					Meteor.users.update(id, {$set: {'profile.viewing': 'RequestOverview'}});
				}
				break;
			case 'Call':
				if (status == 3) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'ProcessingRequest'}});
				} else if (status == 4) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Call'}});
				} else if (status >= 5) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'CallOverview'}});
				}
				break;
			case 'Reserve':
				if (status == 6) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Reserve'}});
				} else if (status >= 7) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'ReserveOverview'}});
				}
				break;
			case 'Treatment':
				if (status == 8) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Treatment'}});
				} else if (status >= 9) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'TreatmentOverview'}});
				}
				break;
			case 'Follow-up':
				if (status == 10) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Follow-up'}});
				} else if (status == 11) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Follow-up2'}});
				} else if (status >= 12) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Follow-upOverview'}});
				}
				break;
			case 'Review':
				if (status == 13) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Review'}});
				} else if (status >= 14) {
					Meteor.users.update(id, {$set: {'profile.viewing': 'Review2'}});
				}
				break;
			default:
				Meteor.users.update(id, {$set: {'profile.viewing': view}});
				break;
		}
	},

	resetStatus: function(id){
		Meteor.users.update(id, {$set: {'profile.curStep': 'Request'}});
		Meteor.users.update(id, {$set: {'profile.status':1}});
		Meteor.users.update(id, {$set: {'profile.viewing': 'Request'}});
	},

	//////////////////////////////////// END OF USER FUNCTIONS ///////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////// PROFILES FUNCTIONS //////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////

	addProfile: function(email,firstname,lastname,phonenumber,address,birthday,gender) {
		Profiles.insert({
			email: email,
			createdAt: new Date().toLocaleString(),
			firstname: firstname,
			lastname: lastname,
			phone: phonenumber,
			address: address,
			birthday: birthday,
			gender: gender,
			preferences: true
		},{removeEmptyStrings: false});
	},

	addPatient: function(email) {
		Patients.insert({
			email: email,
			curStep: 'Request',
			status: 1,
			viewing: 'Request',
			billing: '',
			history: {
				requests: [],
				treatments: [],
				followups: [],
				reviews: []
			}
		},{removeEmptyStrings: false});
	},

	/////////////////////// END OF PROFILES FUNCTIONS ///////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////// PATIENT EMAIL FUNCTIONS ////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////

	checkValidEmail: function(email) {
		if (PatientEmails) {
			var ret = PatientEmails.find({'email':email}).fetch();
			if (ret == undefined) {
				return false;
			}
		}
		return true;
	},

	addPatientEmail: function(email) {
		PatientEmails.insert({
			email: email
		});
	},

	/////////////////////// END OF PATIENT EMAIL FUNCTIONS /////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////// PROVIDER FUNCTIONS /////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	isProvider: function(email) {
		if (Providers) {
			var ret = Providers.findOne({'email':email});
			if (ret == undefined) {
				return false;
			}
		}
		return true;
	},
	addProvider: function(email, isDoctor, licenseNum, npiNum, regions, specialties){
		Providers.insert({
			email: email,
			isDoctor: isDoctor,
			licenseNum: licenseNum,
			npiNum: npiNum,
			regions: regions,
			specialties: specialties
		});
	},

	/////////////////////// END OF PROVIDER FUNCTIONS //////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////// REQUEST FUNCTIONS //////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////

	pushRequest: function(id, info, requesterName){
			if (info.different_address == "on") {
                var address = info.street + ' ' + info.aptNumSuite + ' ' + info.city + ' ' + info.activeStates + ' ' + info.zipcode;
            } else {
				var emailAddress = Meteor.users.findOne({_id:id}).emails[0].address;
				var address = Profiles.findOne({email: emailAddress}).address;
			}
			var times = {laterTime: info.laterTime, preferredTime: info.time, preferredDate: info.date, requestTime: new Date().toLocaleString(),
							callStartTime: "", callEndTime: "", callDuration: 0, reservedTime: ""};

			var treatment = {requestId: "", isHouseCall: true, providerName: "", datetime: "", duration: 0, endTime: "", ETA: "", address: ""};
			var followups = [{}];
			var files = {patientId: id, requestId: "", medicalReport: undefined, invoice: undefined};

			Requests.insert({
				"patientId": id,
				"requestForSomeoneElse": info.for_someone_else,
				"relationship": info.relationship,
				"requesterName": requesterName,
				"firstname": info.tempPatientFirstName,
				"lastname": info.tempPatientLastName,
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
				"providerId": ""
			},{removeEmptyStrings: false});
		// }

	},

	updateRequestedDate: function(requestId, laterTime, newDate){
		return Requests.update({_id: requestId}, {$set: {'times.laterTime': laterTime,'times.preferredDate': newDate}});
	},

	updateRequestedTime: function(requestId, laterTime, newTime){
		return Requests.update({_id: requestId}, {$set: {'times.laterTime': laterTime,'times.preferredTime': newTime}});
	},

	acceptRequest: function(id, providerId){
		Requests.update({_id: id}, {$set: {'accepted': true, 'providerId':providerId}});
	},

	declineRequest: function(id, providerId){
		Requests.update({_id:id}, {$set:{'accepted': false, 'providerId':providerId, 'requestComplete':true}});
	},

	transferRequest: function(id, providerId){
		Requests.update({_id:id}, {$set: {'providerId':providerId}});
	},

	cancelRequest: function(requestId, cancelReason, cancelAfterReserve){
		Requests.update({_id: requestId}, {$set: {'cancelReason': cancelReason, 'cancelAfterReservation': cancelAfterReserve, 'requestComplete':true}});
	},

	getClients: function(){
		return Requests.find().fetch();
	},

	
	//var patientId = Requests.findOne({_id:id}).patientId;
	//	Meteor.users.update(patientId, {$set: {'profile.curStep': 'Reserve'}});
	//	Meteor.users.update(patientId, {$set: {'profile.status': 6}});
	//	Meteor.users.update(patientId, {$set: {'profile.viewing': 'Reserve'}});
	//////////////////////////////////////// END REQUEST FUNCTIONS //////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////// EVENT FUNCTIONS ///////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	addEvent( event ) {
		check( event,
			{
				title: String,
				start: String,
				end: String,
				type: String,
				guests: Number
			});

			try {
				console.log('adding Event')
				return Events.insert( event );
			} catch ( exception ) {
				throw new Meteor.Error( '500', `${ exception }` );
			}
	},

	editEvent( event ) {
		check( event, {
			_id: String,
			title: Match.Optional( String ),
			start: String,
			end: String,
			type: Match.Optional( String ),
			guests: Match.Optional( Number )
		});

		try {
			return Events.update( event._id, {
				$set: event
			});
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	},

	removeEvent( event ) {
		check( event, String );

		try {
			return Events.remove( event );
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	},

	//////////////////////////////////// END OF EVENT FUNCTIONS /////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////// BILLING FUNCTIONS /////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	storeBillingInfo: function(id, billingInfo) {
		Meteor.users.update(id, {$set: {
			'profile.nameOnCard': billingInfo.nameOnCard,
			'profile.cardNumber': billingInfo.cardNumber,
			'profile.cvc': billingInfo.cvc,
			'profile.expirationDate': billingInfo.expirationDate,
			'profile.billingAddress': billingInfo.billingAddress
		}})
	},

	removeBillingInfo: function(id) {
		Meteor.users.update(id, {$set: {
			'profile.nameOnCard': '',
			'profile.cardNumber': 0,
			'profile.cvc': 0,
			'profile.expirationDate': '',
			'profile.billingAddress': ''
		}})
  }
	//////////////////////////////////// END OF BILLING FUNCTIONS /////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
