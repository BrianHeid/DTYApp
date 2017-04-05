Template.dashboard.helpers({
	'isRequest': function(){
		return parseInt(Meteor.user().profile['status']) >= 1
	},
	'isCall': function(){
		return parseInt(Meteor.user().profile['status']) >= 2
	},
	'isReserve': function(){
		return parseInt(Meteor.user().profile['status']) >= 3
	},
	'isTreatment': function(){
		return parseInt(Meteor.user().profile['status']) >= 4
	},
	'isFollowUp': function(){
		return parseInt(Meteor.user().profile['status']) >= 5
	},
	'isReview': function(){
		return parseInt(Meteor.user().profile['status']) >= 6
	},
	})

Template.show_dashboard_page.helpers({
	'isRequest': function(){
		return Meteor.user().profile['viewing'] == 'Request'
	},
	'isCall': function(){
		return Meteor.user().profile['viewing'] == 'Call'
	},
	'isReserve': function(){
		return Meteor.user().profile['viewing'] == 'Reserve'
	},
	'isTreatment': function(){
		return Meteor.user().profile['viewing'] == 'Treatment'
	},
	'isFollowUp': function(){
		return Meteor.user().profile['viewing'] == 'Followup'
	},
	'isReview': function(){
		return Meteor.user().profile['viewing'] == 'Review'
	},
	})



Template.dashboard.onRendered(
	
	function(){
		this.$('.step').click(
			function(events, template){
				var selected = $(event.currentTarget).find('.title').text()
				console.log(selected)
				Meteor.call('updateView', Meteor.userId(), selected)
			}
			)

})

//vartest = setInterval(counter, 1000)

/*
Template.show_dashboard_page.onRendered({
	$(document).click( function(event){
		console.log(event.target)
	})
})*/