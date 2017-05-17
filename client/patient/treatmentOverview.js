Template.treatmentOverview.onRendered(function(){
   ////// NEED TO PULL PROVIDER PROFILE PICTURE FROM DB
    var imageSrc = "/images/drbrown.jpg";
    var imageHTML = "<img src=\"" + imageSrc + "\">";
    document.getElementById("imageProvider").innerHTML = imageHTML;
    
    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());
	
	var providerId = Requests.findOne().providerId;
	Meteor.subscribe("currProvider", providerId);
    
    
});

Template.treatmentOverview.helpers({
   treatmentEnded: function(){
        return Requests.findOne().treatment.endTime;
   },
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