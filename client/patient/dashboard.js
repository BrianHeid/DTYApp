Template.dashboard.onCreated(function(){

});

Template.dashboard.onRendered(function(){

/*	Meteor.call('returnStatusNum', Meteor.userId(), function(error, response){
		if(response == 0){
			FlowRouter.go('/');
		} else {
			Session.set('status', response);
			console.log('status');
			console.log(response);
		}		
	}); */

})

Template.dashboard.helpers({
	'isRequest': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 1){
			return true;
		} else {
			return false;
		}
	},
	'isRequestOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}

		if(status == 2){
			return true;
		} else {
			return false;
		}
	},
	'isProcessingRequest': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 3){
			return true;
		} else {
			return false;
		}
	},
	'isCall': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 4){
			return true;
		} else {
			return false;
		}
	},
	'isCallOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 5){
			return true;
		} else {
			return false;
		}
	},
	'isReserve': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 6){
			return true;
		} else {
			return false;
		}
	},
	'isReserveOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 7){
			return true;
		} else {
			return false;
		}
	},
	'isTreatment': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 8){
			return true;
		} else {
			return false;
		}
	},
	'isTreatmentOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 9){
			return true;
		} else {
			return false;
		}
	},
	'isFollowUp': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 10){
			return true;
		} else {
			return false;
		}
	},
	'isFollowUp2': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 11){
			return true;
		} else {
			return false;
		}
	},
	'isFollowUpOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 12){
			return true;
		} else {
			return false;
		}
	},
	'isReview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 13){
			return true;
		} else {
			return false;
		}
	},
	'isReview2': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 14){
			return true;
		} else {
			return false;
		}
	}
	})

Template.show_dashboard_page.helpers({
	'isRequest': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 1){
			return true;
		} else {
			return false;
		}
	},
	'isRequestOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 2){
			return true;
		} else {
			return false;
		}
	},
	'isProcessingRequest': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 3){
			return true;
		} else {
			return false;
		}
	},
	'isCall': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 4){
			return true;
		} else {
			return false;
		}
	},
	'isCallOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 5){
			return true;
		} else {
			return false;
		}
	},
	'isReserve': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 6){
			return true;
		} else {
			return false;
		}
	},
	'isReserveOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 7){
			return true;
		} else {
			return false;
		}
	},
	'isTreatment': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 8){
			return true;
		} else {
			return false;
		}
	},
	'isTreatmentOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 9){
			return true;
		} else {
			return false;
		}
	},
	'isFollowUp': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 10){
			return true;
		} else {
			return false;
		}
	},
	'isFollowUp2': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 11){
			return true;
		} else {
			return false;
		}
	},
	'isFollowUpOverview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 12){
			return true;
		} else {
			return false;
		}
	},
	'isReview': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 13){
			return true;
		} else {
			return false;
		}
	},
	'isReview2': function(){
		emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		currRequest = Profiles.findOne({email:emailAddress}).currRequest;
		if(currRequest != "0"){
			status = Requests.findOne({_id:currRequest}).status;
		} else {
			status = 1;
		}
		
		if(status == 14){
			return true;
		} else {
			return false;
		}
	}
	})
