Template.menu_temp.events({
	
    'click .logout': function(event){
        event.preventDefault();
        Meteor.call('updateView', Meteor.userId(), Meteor.user().profile['curStep']);
        Meteor.logout();
        FlowRouter.go('/');
		BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "main_page",
                                        footer: "footer_temp"});
    }
});
