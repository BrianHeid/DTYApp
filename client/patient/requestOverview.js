Template.requestOverview.onRendered(function(){
    Meteor.subscribe('currRequests', Meteor.userId());
});

Template.requestOverview.helpers({
    
    datetimeSubmitted: function(){
        return Requests.findOne({patientId:Meteor.userId()}).times.requestTime;
    },
    requestDate: function(){
        return Requests.findOne({patientId:Meteor.userId()}).times.preferredDate;
    },
    requestTime: function(){
        return Requests.findOne({patientId:Meteor.userId()}).times.preferredTime;
    },
    symptoms: function(){
        return Requests.findOne({patientId:Meteor.userId()}).symptoms;
    }
});
