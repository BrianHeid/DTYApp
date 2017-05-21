

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
	})

Template.client.onRendered(
	function(){
		this.$('.menu .item').tab();
		this.$('.ui.button').click(
			function(event, template){
				var op = $(event.currentTarget).text()
				var id = $(event.currentTarget).attr('data')
				
				target = Requests.findOne({_id:id})
				
				if (op == 'Schedule') {
					$('#schedulePrompt').text('Requested time by ' + target.firstname)
					$('#requestedTime').text(target.times.requestTime)
					$('#scheduleRequest').modal('show')
				} else if (op == 'Call') {
					// CALL ACTION NOT YET IMPLEMENTED                    
                } else if (op == 'Decline') {
                    Meteor.call('declineRequest', id, Meteor.userId());
                } else if (op == 'Transfer') {
					$('#transferModal').modal({
						autofocus: false,	// Prevents dropdown from dropping automatically
					}).modal('show');
                }
				
	});
		
	Meteor.subscribe("requests");
	Meteor.subscribe("allUsers");
	
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
				var id = $("#editButton").attr('data');
				
				if (fields.sameTime == "on") {
                    Meteor.call('updateRequestedDate', id, false, fields.date);
					Meteor.call('updateRequestedTime', id, false, fields.time);
                } else {
					Meteor.call('updateRequestedDate', id, true, fields.date);
					Meteor.call('updateRequestedTime', id, true, fields.time);
				}
				console.log(id);
				var patientId = Requests.findOne({_id:id}).patientId;
				console.log(patientId);
				Meteor.call('updateCurStep', patientId, 'Call');
				Meteor.call('updateStatus', patientId, 4);
				Meteor.call('updateView', patientId, 'Call');
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
	getStatus: function(id){
		return Meteor.users.findOne({_id:id}).profile.curStep;
	}
});

Template.newClient.onRendered(function(){
	this.$('#accept_button,#decline_button').click(
		(event, template)=>{
			var op = $(event.currentTarget).text()
			var id = $(event.currentTarget).attr('data')
			if (op == "Accept"){
				console.log(id, "Has been accepted.")
				Meteor.call('acceptRequest', id, Meteor.userId(),
					(error, result)=>{
						console.log(error,result)
					}
					)
			} else if (op == "Decline") {
                console.log(id, "Has been declined.")
				Meteor.call('declineRequest', id, Meteor.userId(),
					(error, result)=>{
						console.log(error,result)
					}
					)
            }
		});
	
	
	var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	
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
		return Requests.find({'accepted':true, 'providerId': Meteor.userId()}).fetch();
	},
	'newRequests': function(){
		return Requests.find({'accepted':false, 'requestComplete':false}).fetch();
	},
	'treatedPatients': function(){
		return Requests.find({'requestComplete':true}).fetch();
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
