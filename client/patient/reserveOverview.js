Template.reserveOverview.onRendered(function(){
    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());
    Meteor.subscribe("currPatient", Meteor.userId());
});

Template.reserveOverview.helpers({
    reservedTime: function(){
        return Requests.findOne().times.reservedTime;
    },
    cardEnding: function(){
        return Requests.findOne().cardEnd;
    },
    billingAddress: function(){
        return Patients.findOne().billing;
    }
});