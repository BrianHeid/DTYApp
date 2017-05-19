Template.adminHome.onRendered(function(){
    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
    
    $('.tabular.menu .item').tab();
});

Template.adminHome.helpers({
   adminName: function(){
        var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
        return Profiles.findOne({email: emailAddress}).firstname;
   }
});
