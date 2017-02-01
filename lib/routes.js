FlowRouter.route( '/',{
	action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "main_page",
                                        footer: "footer_temp"});
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


FlowRouter.route( '/dashboard',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "show_dashboard_page",
                                        footer: "footer_temp"});
        console.log("form_page loaded.")

    }
  }
 )


FlowRouter.route( '/history',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "show_history_page",
                                        footer: "footer_temp"});
        console.log("form_page loaded.")

    }
  }
 )

