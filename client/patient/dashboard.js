Template.dashboard.helpers({
	'isRequest': function(){
		if (Meteor.user()){
			console.log("isRequest");
			console.log(Meteor.user().profile['status']);
			return parseInt(Meteor.user().profile['status']) == 1;
		}
	},
	'isRequestOverview': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 2
	},
	'isProcessingRequest': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 3
	},
	'isCall': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 4
	},
	'isCallOverview': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 5
	},
	'isReserve': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 6
	},
	'isReserveOverview': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 7
	},
	'isTreatment': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 8
	},
	'isTreatmentOverview': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 9
	},
	'isFollowUp': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 10
	},
	'isFollowUp2': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 11
	},
	'isFollowUpOverview': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 12
	},
	'isReview': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 13
	},
	'isReview2': function(){
		if (Meteor.user())
			return parseInt(Meteor.user().profile['status']) == 14
	}
	})

Template.show_dashboard_page.helpers({
	'isRequest': function(){
		if (Meteor.user()){
			console.log("isRequest");
			return Meteor.user().profile['viewing'] == 'Request';
		}
	},
	'isRequestOverview': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'RequestOverview'
	},
	'isProcessingRequest': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'ProcessingRequest'
	},
	'isCall': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Call'
	},
	'isCallOverview': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'CallOverview'
	},
	'isReserve': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Reserve'
	},
	'isReserveOverview': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'ReserveOverview'
	},
	'isTreatment': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Treatment'
	},
	'isTreatmentOverview': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'TreatmentOverview'
	},
	'isFollowUp': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Follow-up'
	},
	'isFollowUp2': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Follow-up2'
	},
	'isFollowUpOverview': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Follow-upOverview'
	},
	'isReview': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Review'
	},
	'isReview2': function(){
		if (Meteor.user())
			return Meteor.user().profile['viewing'] == 'Review2'
	}
	})
