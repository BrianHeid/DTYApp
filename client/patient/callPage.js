Template.callPage.onRendered(function(){
	$("#confirmCancelBtn").click(function(event){
		var id = $(event.currentTarget).attr('data');
		var reason = $("#reason").innerHTML;
		Meteor.call('cancelRequest', id, reason, false);
	});
});