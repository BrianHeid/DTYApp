import { Meteor } from 'meteor/meteor';
import '../lib/collections.js'
// /imports/startup/server/mail-url.js

Meteor.startup(() => {
  // code to run on server at startup
//export const Documents = new Mongo.Collection('User_Documents')
//export const Reviews = new Mongo.Collection('Reviews')
// process.env.MAIL_URL = 'smtp://postmaster%40sandboxbab1a08279c84b34a1c96809281db21c.mailgun.org:7dfad06025cf2029c89f75b5c80e7b25@smtp.mailgun.org:587'
// Meteor.call('email','DoxToYou@gmail.com','DoxToYou@gmail.com','Test','Test 2 message')
});


Accounts.onCreateUser(
    function(options, user){
		user.profile = options.profile ? options.profile : {};
	    return user
	}
);

let EventsSchema = new SimpleSchema({
	'title': {
		type: String,
		label: 'The title of this event.'
	},
	'start': {
		type: String,
		label: 'When this event will start.'
	},
	'end': {
		type: String,
		label: 'When this event will end.'
	},
	'type': {
		type: String,
		label: 'What type of event is this?',
		allowedValues: [ 'New Requests', 'Consultation', 'Follow Up', 'Miscellaneous' ]
	},
	'guests': {
		type: Number,
		label: 'The number of guests expected at this event.'
	}
});

Events.attachSchema( EventsSchema );

let PatientEmailsSchema = new SimpleSchema({
	'email': {
		type: String,
		label: 'Need valid email.'
	}
});

PatientEmails.attachSchema( PatientEmailsSchema );

let ProfilesSchema = new SimpleSchema({
	'email': {
		type: String,
		label: 'Need valid email.'
	},
	'createdAt': {
		type: String,
		label: 'Need valid created time'
	},
	'firstname': {
		type: String,
		label: 'Need valid first name.'
	},
	'lastname': {
		type: String,
		label: 'Need valid last name.'
	},
	'phone': {
		type: Number,
		label: 'Need valid phone number.'
	},
	'address': {
		type: String,
		label: 'Need valid address.'
	},
	'birthday': {
		type: String,
		label: 'Need valid age.'
	},
	'preferences': {
		type: Boolean,
		label: 'Need valid preference.'
	}
});

Profiles.attachSchema( ProfilesSchema );

let PatientsSchema = new SimpleSchema ({
	'email': {
		type: String,
		label: 'Need valid email.'
	},
	'status': {
		type: Number,
		label: 'Need valid status.'
	},
	'viewing': {
		type: String,
		label: 'Need valid viewing.'
	},
	'billing': {
		type: String,
		label: 'Need valid billing address.'
	},
	'history': {
		type: Object,
		label: 'Need valid history',
		blackbox: true
	}
});

Patients.attachSchema( PatientsSchema );

let ProvidersSchema = new SimpleSchema ({
	'_id': {
		type: String,
		label: 'Need valid user ID.'
	},
	'propic': {
		type: Object,
		label: 'Need valid propic',
		blackbox: true
	},
	'licenseNum': {
		type: String,
		label: 'Need valid license number.',
		blackbox: true
	},
	'npiNum': {
		type: Number,
		label: 'Need valid NPI number.'
	},
	'region': {
		type: [String],
		label: 'Need valid region.'
	},
	'specialities': {
		type: [String],
		label: 'Need valid specialities.'
	},
});

Providers.attachSchema( ProvidersSchema );

let AdminsSchema = new SimpleSchema ({
	'_id': {
		type: String,
		label: 'Need valid user ID.'
	}
});

Admins.attachSchema( AdminsSchema );

let RequestsSchema = new SimpleSchema ({
	'patientId': {
		type: String,
		label: 'Need valid patient ID.'
	},
	'step': {
		type: String,
		label: 'Need valid step of request.'
	},
	'requestFor': {
		type: String,
		label: 'Need valid request for someone.'
	},
	'requesterName': {
		type: String,
		label: 'Need valid requester name.'
	},
	'firstname': {
		type: String,
		label: 'Need valid first name of patient.'
	},
	'lastname': {
		type: String,
		label: 'Need valid last name of patient.'
	},
	'address': {
		type: String,
		label: 'Need valid address of request.'
	},
	'times': {
		type: Object,
		label: 'Need valid time object.',
		blackbox: true
	},
	'symptoms': {
		type: String,
		label: 'Need valid symptoms.'
	},
	'treatment': {
		type: Object,
		label: 'Need valid treatment object.',
		blackbox: true
	},
	'cardEnd': {
		type: Number,
		label: 'Need valid four digit card ending of credit card'
	},
	'followups': {
		type: Object,
		label: 'Need valid followups',
		blackbox: true
	},
	'files': {
		type: Object,
		label: 'Need valid files',
		blackbox: true
	},
	'cancelReason': {
		type: String,
		label: 'Need valid cancellation reason'
	},
	'cancelAfterReserve': {
		type: Boolean,
		label: 'Need to know if canceled after reserving'
	},
	'requestComplete': {
		type: Boolean,
		label: 'Need to know if request is complete.'
	}
});

Requests.attachSchema( RequestsSchema );