Template.dashboard.helpers({
	'isRequest': function(){
		if (Meteor.user())
			return parseInt(Patients.status) >= 1
				// Meteor.user().profile['status']) >= 1
	},
	'isCall': function(){
		if (Meteor.user())
			return parseInt(Patients.status) >= 2
				// Meteor.user().profile['status']) >= 2
	},
	'isReserve': function(){
		if (Meteor.user())
			return parseInt(Patients.status) >= 3
			// return parseInt(Meteor.user().profile['status']) >= 3
	},
	'isTreatment': function(){
		if (Meteor.user())
			return parseInt(Patients.status) >= 4
			// return parseInt(Meteor.user().profile['status']) >= 4
	},
	'isFollowUp': function(){
		if (Meteor.user())
			return parseInt(Patients.status) >= 5
			// return parseInt(Meteor.user().profile['status']) >= 5
	},
	'isReview': function(){
		if (Meteor.user())
			return parseInt(Patients.status) >= 6
			// return parseInt(Meteor.user().profile['status']) >= 6
	},
	})

Template.show_dashboard_page.helpers({
	'isRequest': function(){
		if (Meteor.user())
			return Patients.viewing == 'Request'
			// return Meteor.user().profile['viewing'] == 'Request'
	},
	'isCall': function(){
		if (Meteor.user())
			return Patients.viewing == 'Call'
			// return Meteor.user().profile['viewing'] == 'Call'
	},
	'isReserve': function(){
		if (Meteor.user())
			return Patients.viewing == 'Reserve'
			// return Meteor.user().profile['viewing'] == 'Reserve'
	},
	'isTreatment': function(){
		if (Meteor.user())
			return Patients.viewing == 'Treatment'
			// return Meteor.user().profile['viewing'] == 'Treatment'
	},
	'isFollowUp': function(){
		if (Meteor.user())
			return Patients.viewing == 'Follow-Up'
			// return Meteor.user().profile['viewing'] == 'Follow-up'
	},
	'isReview': function(){
		if (Meteor.user())
			return Patients.viewing == 'Review'
			// return Meteor.user().profile['viewing'] == 'Review'
	},
	})