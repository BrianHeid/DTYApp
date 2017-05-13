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

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////														/////////////////
/////////////////                    COLLECTION SCHEMAS                /////////////////
////////////////													  /////////////////
//////////////////////////////////////////////////////////////////////////////////////

////////////////////// EVENTS
/////////////////////////////

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


////////////////////// PATIENT EMAILS
///////////////////////////////////////


let PatientEmailsSchema = new SimpleSchema({
	'email': {
		type: String,
		label: 'Need valid email.'
	}
});

PatientEmails.attachSchema( PatientEmailsSchema );


////////////////////// PROFILES
///////////////////////////////


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
	'gender': {
		type: String,
		label: 'Need valid gender.'
	},
	'preferences': {
		type: Boolean,
		label: 'Need valid preference.'
	}
});

Profiles.attachSchema( ProfilesSchema );


////////////////////// PATIENTS
///////////////////////////////


let PatientsSchema = new SimpleSchema ({
	'email': {
		type: String,
		label: 'Need valid email.'
	},
	'curStep': {
		type: String,
		label: 'Need valid current step.'
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


////////////////////// PROVIDERS
////////////////////////////////


let ProvidersSchema = new SimpleSchema ({
	'_id': {
		type: String,
		label: 'Need valid user ID.'
	},
	'isDoctor': {
		type: Boolean,
		label: 'Is the provider a doctor?'
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
	'regions': {
		type: [String],
		label: 'Need valid region.'
	},
	'specialities': {
		type: [String],
		label: 'Need valid specialities.'
	},
});

Providers.attachSchema( ProvidersSchema );


////////////////////// ADMINS
/////////////////////////////


let AdminsSchema = new SimpleSchema ({
	'_id': {
		type: String,
		label: 'Need valid user ID.'
	}
});

Admins.attachSchema( AdminsSchema );


////////////////////// REQUESTS
///////////////////////////////


let RequestsSchema = new SimpleSchema ({
	'patientId': {
		type: String,
		label: 'Need valid patient ID.'
	},
	'requestForSomeoneElse': {
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
		type: [Object],
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
	},
	'accepted': {
		type: Boolean,
		label: 'Need to know if request was accepted.'
	}
});

Requests.attachSchema( RequestsSchema );


////////////////////// SHIFTS
/////////////////////////////


let ShiftsSchema = new SimpleSchema({
	'providerName': {
		type: String,
		label: 'Need a valid provider name.'
	},
	'date': {
		type: String,
		label: 'Need a valid date.'
	},
	'startTime': {
		type: String,
		label: 'Need a valid start time.'
	},
	'endTime': {
		type: String,
		label: 'Need a valid end time.'
	},
	'regions': {
		type: [String],
		label: 'Need valid regions.'
	},
	'approved': {
		type: Boolean,
		label: 'Is this shift approved?'
	},
	'completed': {
		type: Boolean,
		label: 'Is this shift completed?'
	} 
});

Shifts.attachSchema( ShiftsSchema );


////////////////////// TREATMENTS
/////////////////////////////////


let TreatmentsSchema = new SimpleSchema({
	'requestId': {
		type: String,
		label: 'Need a valid request ID.'
	},
	'isHousecall': {
		type: Boolean,
		label: 'Is this treatment a housecall?'
	},
	'providerName': {
		type: String,
		label: 'Need a valid provider name.'
	},
	'datetime': {
		type: String,
		label: 'Need a valid datetime.'
	},
	'duration': {
		type: Number,
		label: 'Need valid time duration of treatment.'
	},
	'ETA': {
		type: String,
		label: 'Need valid ETA.'
	},
	'address': {
		type: String,
		label: 'Need valid address.'
	} 
});

Treatments.attachSchema( TreatmentsSchema );


////////////////////// FILES
////////////////////////////


let FilesSchema = new SimpleSchema({
	'patientId': {
		type: String,
		label: 'Need valid patient ID.'
	},
	'requestId': {
		type: String,
		label: 'Need valid request ID.'
	},
	'medicalReport': {
		type: Object,
		label: 'Need valid medical report file.',
		blackbox: true
	},
	'invoice': {
		type: Object,
		label: 'Need valid invoice file.',
		blackbox: true
	}
});

Files.attachSchema( FilesSchema );


////////////////////// FOLLOWUPS
////////////////////////////////


let Followups = new SimpleSchema({
	'requestId': {
		type: String,
		label: 'Need valid request ID.'
	},
	'number': {
		type: Number,
		label: 'Need valid follow-up number.'
	},
	'datetimeSent': {
		type: String,
		label: 'Need valid datetime of follow-up sent.'
	},
	'feeling': {
		type: String,
		label: 'Need valid patient feeling.'
	},
	'comments': {
		type: String,
		label: 'Need valid patient comments.'
	},
	'isBetter': {
		type: Boolean,
		label: 'Is the patient better?'
	},
	'messages': {
		type: Object,
		label: 'Need valid messages.',
		blackbox: true
	},
	'treatmentDatetime': {
		type: String,
		label: 'Need valid treatment datetime.'
	},
	'treatmentDuration': {
		type: Number,
		label: 'Need valid treatment duration.'
	}
});

Treatments.attachSchema( TreatmentsSchema );


////////////////////// MESSAGES
///////////////////////////////


let MessagesSchmema = new SimpleSchema({
	'datetime': {
		type: String,
		label: 'Need valid datetime of message sent.'
	},
	'to': {
		type: String,
		label: 'Need valid message recipient name.'
	},
	'from': {
		type: String,
		label: 'Need valid sender name.'
	},
	'text': {
		type: String,
		label: 'Need valid text of message.'
	}
});

Messages.attachSchema( MessagesSchmema );


////////////////////// REVIEWS
//////////////////////////////


let ReviewsSchema = new SimpleSchema({
	'requestId': {
		type: String,
		label: 'Need valid request ID.'
	},
	'datetime': {
		type: String,
		label: 'Need valid datetime of review.'
	},
	'providerName': {
		type: String,
		label: 'Need valid provider name.'
	},
	'punctual': {
		type: Number,
		label: 'Need valid punctual rating.'
	},
	'professional': {
		type: Number,
		label: 'Need valid professional rating.'
	},
	'courteous': {
		type: Number,
		label: 'Need valid courteous rating.'
	},
	'caring': {
		type: Number,
		label: 'Need valid courteous rating.'
	},
	'followup': {
		type: Number,
		label: 'Need valid follow-up rating.'
	},
	'comments': {
		type: String,
		label: 'Need valid comments.'
	}
});

Reviews.attachSchema( ReviewsSchema );
