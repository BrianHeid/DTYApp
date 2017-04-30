Template.dashboard.helpers({
	'isRequest': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) >= 1
	},
	'isCall': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) >= 2
	},
	'isReserve': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) >= 3
	},
	'isTreatment': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) >= 4
	},
	'isFollowUp': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) >= 5
	},
	'isReview': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) >= 6
	},
	})

Template.show_dashboard_page.helpers({
	'isRequest': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Request'
	},
	'isProcessing': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Processing'
	},
	'isCall': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Call'
	},
	'isReserve': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Reserve'
	},
	'isTreatment': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Treatment'
	},
	'isFollowUp': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Follow-up'
	},
	'isReview': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Review'
	},
	})
