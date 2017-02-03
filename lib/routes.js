FlowRouter.route( '/',{
	action: function(params) {
<<<<<<< HEAD
        BlazeLayout.render("App_body", {main: "main_page", logoff_dashboard: 'dashboard'});
=======
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "main_page",
                                        footer: "footer_temp"});
>>>>>>> 0ba5de60097ab46d72ee8e4b3dcc7f3669d416c0
        console.log("main_page loaded.")
        console.log(params)
    }
  }
 )


FlowRouter.route( '/account',{
	action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "show_profile_page",
                                        footer: "footer_temp"});
        console.log("form_page loaded.")

    }
  }
 )


<<<<<<< HEAD
FlowRouter.route( '/new_account',{
	action: function(params) {
        BlazeLayout.render("App_body", {main: "show_form_page", logoff_dashboard: 'dashboard'});
=======
FlowRouter.route( '/dashboard',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "show_dashboard_page",
                                        footer: "footer_temp"});
>>>>>>> 0ba5de60097ab46d72ee8e4b3dcc7f3669d416c0
        console.log("form_page loaded.")

    }
  }
 )


<<<<<<< HEAD
FlowRouter.route( '/test',{
	action: function(params) {
        BlazeLayout.render("App_body", {main: "show_form_page", logoff_dashboard: 'dashboard'});
=======
FlowRouter.route( '/history',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "show_history_page",
                                        footer: "footer_temp"});
>>>>>>> 0ba5de60097ab46d72ee8e4b3dcc7f3669d416c0
        console.log("form_page loaded.")

    }
  }
 )

