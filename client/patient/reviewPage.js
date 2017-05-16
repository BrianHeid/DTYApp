Template.reviewPage.onRendered(function(){
    
    $("#emailPrefBtn").click(function(){
        FlowRouter.go('/account#emailPref');	
    });
    
    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());
	
	var providerId = Requests.findOne().providerId;
	Meteor.subscribe("currProvider", providerId);

});

Template.reviewPage.helpers({
    providerName: function(){
        var providerFullName = "";
		var isDoctor = Providers.findOne().isDoctor;
		
		if (isDoctor) {
            providerFullName += "Dr. ";
        }
		var providerId = Requests.findOne().providerId;
		var firstName = Profiles.findOne({_id:providerId}).firstname;
		var lastName = Profiles.findOne({_id:providerId}).lastname;
		
		providerFullName += firstName + " " + lastName;
		
		return providerFullName;
   }
});