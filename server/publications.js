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

// Gets all requests that correspond to id and are incomplete

Meteor.publish("currProfile", function( ){
	emailAddress = Meteor.users.findOne({_id:this.userId}).emails[0].address;
	console.log(emailAddress);
	return Profiles.find({email:emailAddress});
});


/* Meteor.publish("currPatient", function(id){
	return Patients.find({_id:id});
})

Meteor.publish("currProvider", function(id){
	return Providers.findOne({_id:id});
});

Meteor.publish("allUsers", function(){
	return Meteor.users.find();
});

Meteor.publish("singleRequest", function(requestId){
	return Requests.find({_id:requestId});
}) */

Meteor.publish('currStatus', function(currRequest) {
  if (!this.userId) {
    return this.ready();
  }
  return Requests.find({
  	_id:currRequest
  }, {
    fields: Requests.status
  });
});
