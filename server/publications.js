Meteor.publish("patientEmails",function(){return PatientEmails.find();});
Meteor.publish("profiles",function(){return Profiles.find();});
Meteor.publish("patients",function(){return Patients.find();});
Meteor.publish("providers",function(){return Providers.find();});
Meteor.publish("admins",function(){return Admins.find();});
Meteor.publish("shifts",function(){return Shifts.find();});

Meteor.publish("requests",function(){return Requests.find();});
Meteor.publish("treatments",function(){return Treatments.find();});
Meteor.publish("files",function(){return Files.find();});
Meteor.publish("followUps",function(){return Followups.find();});
Meteor.publish("messages",function(){return Messages.find();});
Meteor.publish("reviews",function(){return Reviews.find();});

Meteor.publish("events",function(){return Events.find();});


Meteor.publish("currRequest", function(id){
	return Requests.findOne({patientId:id});
});

Meteor.publish("currProfile", function(email){
	return Profiles.findOne({email:email});
});

