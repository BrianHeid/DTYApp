Template.dashboard.onCreated(function(){
	email = Meteor.users.findOne({_id:Meteor.userId()});
	Meteor.subscribe("currProfile", email);
});

Template.dashboard.helpers({
	'isRequest': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			console.log("Patient email");
			console.log(patientEmail);
			console.log("Status");
			console.log(Profiles.findOne({email:patientEmail}).status)
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 1;
		}
	},
	'isRequestOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 2;
		}
	},
	'isProcessingRequest': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 3;
		}
	},
	'isCall': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 4;
		}
	},
	'isCallOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 5;
		}
	},
	'isReserve': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 6;
		}
	},
	'isReserveOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 7;
		}
	},
	'isTreatment': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 8;
		}
	},
	'isTreatmentOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 9;
		}
	},
	'isFollowUp': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 10;
		}
	},
	'isFollowUp2': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 11;
		}
	},
	'isFollowUpOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 12;
		}
	},
	'isReview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 13;
		}
	},
	'isReview2': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 14;
		}
	}
	})

Template.show_dashboard_page.helpers({
	'isRequest': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 1;
		}
	},
	'isRequestOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 2;
		}
	},
	'isProcessingRequest': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 3;
		}
	},
	'isCall': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 4;
		}
	},
	'isCallOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 5;
		}
	},
	'isReserve': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 6;
		}
	},
	'isReserveOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 7;
		}
	},
	'isTreatment': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 8;
		}
	},
	'isTreatmentOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 9;
		}
	},
	'isFollowUp': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 10;
		}
	},
	'isFollowUp2': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 11;
		}
	},
	'isFollowUpOverview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 12;
		}
	},
	'isReview': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 13;
		}
	},
	'isReview2': function(){
		if (Meteor.user()){
			var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			return parseInt(Profiles.findOne({email:patientEmail}).status) == 14;
		}
	}
	})
