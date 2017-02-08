Template.dashboard.helpers({
	'isRequest': function(){
		return FlowRouter.current().queryParams['status'] == 'request'
	},
	'isCall': function(){
		return FlowRouter.current().queryParams['status'] == 'call'
	},
	'isReserve': function(){
		return FlowRouter.current().queryParams['status'] == 'reserve'
	},
	'isTreatment': function(){
		return FlowRouter.current().queryParams['status'] == 'treatment'
	},
	'isFollowUp': function(){
		return FlowRouter.current().queryParams['status'] == 'followup'
	},
	'isReview': function(){
		return FlowRouter.current().queryParams['status'] == 'review'
	},
	})

Template.show_dashboard_page.helpers({
	'isRequest': function(){
		return FlowRouter.current().queryParams['status'] == 'request'
	},
	'isCall': function(){
		return FlowRouter.current().queryParams['status'] == 'call'
	},
	'isReserve': function(){
		return FlowRouter.current().queryParams['status'] == 'reserve'
	},
	'isTreatment': function(){
		return FlowRouter.current().queryParams['status'] == 'treatment'
	},
	'isFollowUp': function(){
		return FlowRouter.current().queryParams['status'] == 'followup'
	},
	'isReview': function(){
		return FlowRouter.current().queryParams['status'] == 'review'
	},
	})
