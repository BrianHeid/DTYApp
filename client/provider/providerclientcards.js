

Template.clientListPage.onRendered(
	function(){
		this.$('.menu .item').tab();
	})

Template.client.onRendered(
	function(){
		this.$('.ui.button').click(
			function(event, template){
				var op = $(event.currentTarget).text()
				var id = $(event.currentTarget).attr('data')

				client = Session.get('client')
				target = client.find(findUser,id)

				console.log('Executing:', op, ' on ', target._id)
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