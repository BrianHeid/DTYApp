Template.reviewPage.onRendered(function(){

	Meteor.call('getCurrProviderName', Meteor.userId(), function(err, response){
		console.log("Reponse");
		console.log(response);
		Session.set('providerName', response);
	});
    
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
		providerName = Session.get('providerName');		
		return providerName;
   }
});