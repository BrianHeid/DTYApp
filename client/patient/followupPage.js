Template.followupPage.onRendered(function(){
     
    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());
	
	var providerId = Requests.findOne().providerId;
	Meteor.subscribe("currProvider", providerId);

});


Template.followupPage.helpers({
   patientName: function(){
   		var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
        return Profiles.findOne({email:patientEmail}).firstname;
   }

});