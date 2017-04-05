

Template.clientListPage.onRendered(
	function(){
		this.$('.menu .item').tab();
		this.$('#createRequest').click(
			()=>{
				this.$('#createRequestModal').modal('show')
				
			}
			)
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
		this.$('.ui.checkbox').checkbox({
			onChecked: function(){
				$('#time,#date').hide()
				
			
			},
			onUnchecked: function(){
				$('#time,#date').show()
			}
		})
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