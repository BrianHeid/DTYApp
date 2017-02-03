FlowRouter.route( '/',{
	action: function(params) {
        BlazeLayout.render("App_body", {main: "main_page", logoff_dashboard: 'dashboard'});
        console.log("main_page loaded.")
        console.log(params)
    }



  }
 )


FlowRouter.route( '/new_account',{
	action: function(params) {
        BlazeLayout.render("App_body", {main: "show_form_page", logoff_dashboard: 'dashboard'});
        console.log("form_page loaded.")

    }
  }
 )


FlowRouter.route( '/test',{
	action: function(params) {
        BlazeLayout.render("App_body", {main: "show_form_page", logoff_dashboard: 'dashboard'});
        console.log("form_page loaded.")

    }
  }
 )