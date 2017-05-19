Template.followupOverview.onRendered(function(){
    $("#click-here-btn").click(function(){
        Meteor.call('updateView', Meteor.userId(), 'Review');
    });
    
    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());
	
	var providerId = Requests.findOne().providerId;
	Meteor.subscribe("currProvider", providerId);
});

Template.followupOverview.helpers({
    lastFollowupDatetime: function(){
        return "5/16/17, 5:30:00 PM"; //////////// <<<------- CHANGE LATER
    },
    patientName: function(){
        return Profiles.findOne().firstname;
    }
});