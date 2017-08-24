Template.menu_temp.events({
	
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');
		/*BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "entrance",
                                        footer: "footer_temp"});*/
    }
});
