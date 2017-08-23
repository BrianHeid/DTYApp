
Template.clientListPage.onCreated(
	function(){
		Meteor.subscribe('allUsers');
		Meteor.subscribe('requests');
		Meteor.subscribe('profiles');
	});

Template.clientListPage.onRendered(
	function(){
		// Sets the date minimum to today's date
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		 if(dd<10){
		        dd='0'+dd
		    } 
		    if(mm<10){
		        mm='0'+mm
		    } 

		today = yyyy+'-'+mm+'-'+dd;
		document.getElementById("birthday").setAttribute("max", today);
		document.getElementById("date").setAttribute("min", today);

		$("#time-form").hide();

		this.$('#myonoffswitch-time').click(function(){
			$("#time-form").toggle();
		});

		this.$('.menu .item').tab();
		
		// Click to create request button to show modal
  		$("#createRequest").click(function(){
  			$("#createRequestModal").modal("show");
  		});

  		// Click to create request modal
   		$('#createRequestModal').modal({
				autofocus: false,	// Prevents dropdown from dropping down
			}).modal('setting', 'closable', false)	// Prevents clicking outside to close, need to choose an action button
		;

		///////////////////////////////////////////// AVAILABILITY LABEL ///////////////////////////////////////////////////////////
		var curStatus = "unavailable";
		var availableStatusLabel = "<div class=\"ui green label large\"><i class=\"check circle icon\"></i>AVAILABLE</div>";
		var unavailableStatusLabel = "<div class=\"ui grey label large\"><i class=\"remove circle icon\"></i>UNAVAILABLE</div>";
		var status = curStatus == "available" ? availableStatusLabel : unavailableStatusLabel;

		var statusText = "Your status: " + status;
		document.getElementById("status").innerHTML = statusText;

		////////////////////////////////////////// Set provider name for texts ////////////////////////////////////////////////

	});

Template.patient.onRendered(function(){

			// Click to submit button
		$("#submitButton").click(function(){
			$("#transferModal").modal("hide");
			$("#transferCompleteModal").modal("show");
		});
		
		// Dropdown functionality
		$('.ui.dropdown').dropdown();

		var requestId = this.data._id;

		Meteor.call('returnStatus', requestId, function(error, result){
			console.log("Call session");
			console.log(requestId);
			Session.set(requestId, result);
		});

	});


Template.patient.events({
	'click #sendFollowUp' : function (event) {
		event.preventDefault();
		var requestId = this._id;
		var patientId = Requests.findOne({_id:requestId}).patientId;
    	Meteor.call('setStatusFollowup2', patientId);
  		var patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;
    	console.log("Follow up sent to ");
    	console.log(patientId);
		Meteor.call('sendSMS',{
			to: '+1' + Profiles.findOne({email: patientEmail}).phone,
			text: 'Are you feeling better? Please let us know so we can conclude your care: http://newcare.doctorstoyou.com'
		});
	},
	'click #treatmentComplete' : function (event) {
		event.preventDefault();
		var requestId = this._id;
		var patientId = Requests.findOne({_id:requestId}).patientId;
  		var patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;
        Meteor.call('setStatusFollowup', patientId);
    	console.log("Completed treatment for");
    	console.log(patientId);
	},
	'click #schedule' : function (event) {
		event.preventDefault();
		var requestId = this._id;
		var patientId = Requests.findOne({_id:requestId}).patientId;
  		var patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;

		Meteor.call('setStatusReserve', patientId);
        Meteor.call('sendSMS',{
			to: '+1' + Profiles.findOne({email: patientEmail}).phone,
			text: 'Return to the request page to complete your reservation: http://newcare.doctorstoyou.com'
		});

	//	Session.set("patientId", patientId);
	//	Session.set("schedule", true);
	},
	'click #scheduleNow' : function (event) {
		event.preventDefault();
		var requestId = this._id;
		var patientId = Requests.findOne({_id:requestId}).patientId;
		console.log(patientId);
  		var patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;

		Meteor.call('setStatusReserve', patientId);
        Meteor.call('sendSMS',{
			to: '+1' + Profiles.findOne({email: patientEmail}).phone,
			text: 'Return to the request page to complete your reservation: http://newcare.doctorstoyou.com'
		});

		$('#scheduleModal').modal('hide');
	},
	'click #scheduleCancel' : function (event) {
		event.preventDefault();
		$('#scheduleModal').modal('hide');
	},
	'click #decline' : function (event) {
		event.preventDefault();
		var requestId = this._id;
		var patientId = Requests.findOne({_id:requestId}).patientId;
  		var patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;
        Meteor.call('declineRequest', requestId, Meteor.userId());
        Meteor.call('sendSMS',{
			to: '+1' + Profiles.findOne({email: patientEmail}).phone,
			text: 'Your request has been declined.'
		});
	},
	'click #transfer' : function (event) {
		event.preventDefault();
		var requestId = this._id;
		$('#transferModal').modal({
			autofocus: false,	// Prevents dropdown from dropping automatically
		}).modal('show');
	},
	'click #concludeCare' : function (event) {
		event.preventDefault();
		var requestId = this._id;
		var patientId = Requests.findOne({_id:requestId}).patientId;
  		var patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;
		Meteor.call('requestComplete', patientId);
		console.log("Request complete");
		console.log(patientId);
		Meteor.call('sendSMS',{
			to: '+1' + Profiles.findOne({email: patientEmail}).phone,
			text: 'Thank you for choosing Doctors To You. Your invoice and medical records are available here: http://newcare.doctorstoyou.com'
		});
	},
	'click #call' : function(event) {
		event.preventDefault();
		var requestId = this._id;
		var patientId = Requests.findOne({_id:requestId}).patientId;
		console.log("Client Patient ID");
		console.log(patientId);
	},
	'click #onYourWay' : function (event) {
		event.preventDefault();
		var requestId = this._id;
		var patientId = Requests.findOne({_id:requestId}).patientId;
  		var patientEmail = Meteor.users.findOne({_id:patientId}).emails[0].address;
		Meteor.call('sendSMS',{
			to: '+1' + Profiles.findOne({email: patientEmail}).phone,
			text: 'Your provider is now on their way'
		});
	}
});


Template.patient.helpers({
	getPhonenumber: function(requestId){
		var patientId = Requests.findOne({_id:requestId}).patientId;
		console.log(patientId);
		var email = Meteor.users.findOne({_id:patientId}).emails[0].address;
		return Profiles.findOne({email:email}).phone;
	},
	getEmail: function(requestId){
		var patientId = Requests.findOne({_id:requestId}).patientId;
		console.log(patientId);
		return Meteor.users.findOne({_id:patientId}).emails[0].address;
	},
	getBirthday: function(patientId){
		var emailAddress = Meteor.users.findOne({_id:patientId}).emails[0].address;
		console.log("Birthday");
		console.log(emailAddress);
		return Profiles.findOne({email:emailAddress}).birthday;
	},
	getStatus: function(){
		var statusText = Session.get(this._id);
		console.log("getStatus session");
		console.log(this._id);
		return statusText;
	}
});

/* Template.client.onRendered(
	function(){
		this.$('.menu .item').tab();
		this.$('.ui.button').click(
			function(event, template){
				var op = $(event.currentTarget).text()
				var requestId = $(event.currentTarget).attr('data')
				Meteor.subscribe('singleRequest', requestId);
				var target = Requests.findOne({_id:requestId});
				patientId = Requests.findOne({_id:requestId}).patientId;
				Meteor.subscribe('currProfile', patientId);
				
				if (op == 'Schedule') {
					$('#schedulePrompt').text('Requested time by ' + target.firstname)
					$('#requestedTime').text(target.times.requestTime)
					$('#scheduleRequest').modal('show')
				} else if (op == 'Call') {
					// CALL ACTION NOT YET IMPLEMENTED                    
                } else if (op == 'Decline') {
                    Meteor.call('declineRequest', requestId, Meteor.userId());
                } else if (op == 'Transfer') {
					$('#transferModal').modal({
						autofocus: false,	// Prevents dropdown from dropping automatically
					}).modal('show');
                }
				
	});
	
	// Click to submit button
	$("#submitButton").click(function(){
		$("#transferModal").modal("hide");
		$("#transferCompleteModal").modal("show");
	});
	
	// Dropdown functionality
	$('.ui.dropdown').dropdown();
	
	$("#scheduleSwitch").click(function(){
			$('#datetime-form').toggle();
		});

	$('#scheduleForm').form({
		inline: true,
		on: 'blur',
		transition: 'slide down',
		keyboardShortcuts: true,

		onSuccess: (event, fields)=>{
			event.preventDefault()
			console.log(fields)
			var requestId = $("#editButton").attr('data');
			
			if (fields.sameTime == "on") {
                Meteor.call('updateRequestedDate', requestId, false, fields.date);
				Meteor.call('updateRequestedTime', requestId, false, fields.time);
            } else {
				Meteor.call('updateRequestedDate', requestId, true, fields.date);
				Meteor.call('updateRequestedTime', requestId, true, fields.time);
			}
			console.log(requestId);
			var patientId = Requests.findOne({_id:requestId}).patientId;
			console.log(patientId);
			Meteor.call('updateStatus', patientId, 6);
		},

		fields: {
			time:{
				identifier: 'time',
				rule: [
					{
						type: 'empty',
						prompt: 'Please pick a time.'
					}
				]
			},
		date: {
			identifier: 'date',
			rule: [
				{
					type: 'empty',
					prompt: 'Please pick a date.'
				}
			]
		}
	}
	})
});


Template.client.helpers({
	getPhonenumber: function(id){
		var emailAddress = Meteor.users.findOne({_id:id}).emails[0].address;
		return Profiles.findOne({email: emailAddress}).phone;
	},
	getEmail: function(id){
		return Meteor.users.findOne({_id:id}).emails[0].address;
	},
	getBirthday: function(id){
		var emailAddress = Meteor.users.findOne({_id:id}).emails[0].address;
		return Profiles.findOne({email: emailAddress}).birthday;
	},
	getStatus: function(patientId){
		return Profiles.findOne({_id:patientId}).status;
	}
}); */

Template.newClient.onRendered(function(){
	this.$('#accept_button,#decline_button').click(
		(event, template)=>{
			var op = $(event.currentTarget).text();
			var requestId = $(event.currentTarget).attr('data');
			var patientId = Requests.findOne({_id:requestId}).patientId;
			var patientEmailAddress = Meteor.users.findOne({_id:patientId}).emails[0].address;
			var providerEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
			var providerName = Profiles.findOne({email:providerEmail}).firstname;
			Meteor.subscribe("currProfile", patientEmailAddress);
			console.log("Patient ID:");
			console.log(patientId);

			if (op == "Accept"){
				console.log(patientEmailAddress, "Has been accepted.");
				Meteor.call('acceptRequest', requestId, Meteor.userId(),
					(error, result)=>{
						console.log(error,result)
					}
					);
				Meteor.call('sendSMS',{
					to: '+1' + Profiles.findOne({email: patientEmailAddress}).phone,
					text: providerName + ' has accepted your request and will contact you shortly.'
				});
				Meteor.call('setStatusCall', patientId);
			} else if (op == "Decline") {
                console.log(patientId, "Has been declined.");
				Meteor.call('declineRequest', requestId, Meteor.userId(),
					(error, result)=>{
						console.log(error,result)
					}
					);
				Meteor.call('resetStatus', patientId);
            }
		});
	
	
	var providerEmailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", providerEmailAddress);

});

Template.newClient.helpers({
	getPhonenumber: function(){
		var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		return Profiles.findOne({email: emailAddress}).phone;
	},
	getEmail: function(){
		return Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	},
	getBirthday: function(){
		var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
		return Profiles.findOne({email: emailAddress}).birthday;
	}
});

Template.clientListPage.helpers({
	'providerName': function(){
		var emailAddress = Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
		return Profiles.findOne({email: emailAddress}).firstname;
	},
	'getClients': function(){
		return Session.get('client');
	},
	'clients': function(){
		return Requests.find({'accepted':true, 'providerId': Meteor.userId(), 'requestComplete': false}).fetch();
	},
	'newRequests': function(){
		return Requests.find({'accepted':false, 'requestComplete':false}).fetch();
	},
	'treatedPatients': function(){
		return Requests.find({'requestComplete':true, 'providerId': Meteor.userId()}).fetch();
	}
})

Template.clientListPage.created = function(){
	Meteor.call('getClients', function(error, result){
		Session.set('client', result);
	});
}


function findUser(obj){
	return obj._id == this
}
