

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
				
				//client = Session.get('client') 		// Use this when dealing with actual client data
				//target = client.find(findUser,id) 	// to update the user account's status
				target = Requests.findOne({_id:id})

				console.log('Executing:', op, ' on ', target._id)
				if (op == 'Schedule')
				{
					$('#schedulePrompt').text('Requested time by ' + target.info.firstName)
					$('#requestedTime').text(target.info.requestTime)
					$('#scheduleRequest').modal('show')
				}

				})
			}
			)
	
Template.newClient.onRendered(
	()=>{
		this.$('#accept_button,#decline_button').click(
			(event, template)=>{
				var op = $(event.currentTarget).text()
				var id = $(event.currentTarget).attr('data')
				if (op == "Accept"){
					console.log(id, "Has been accepted.")
					Meteor.call('acceptRequest', id,
						(error, result)=>{
							console.log(error,result)
						}
						)
				}
			})
	}
	)	

Template.scheduleModal.onRendered(
	()=>{
		$("#scheduleSwitch").click(function(){
			$('#datetime-form').toggle();
		});

		this.$('#scheduleForm').form({
			inline: true,
			on: 'blur',
			transition: 'slide down',
			onSuccess: (event, fields)=>{
				event.preventDefault()
				console.log(fields)
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
	}
	)

Template.clientListPage.helpers({
	'getClients': function(){

		return Session.get('client')
	},
	'clients': function(){
		return Requests.find({'accepted':true}).fetch()
	},
	'newRequests': function(){
		return Requests.find({'accepted':false}).fetch()
	},
	'treatedPatients': function(){
		return Requests.find({'treated':true}).fetch()
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