// ROUTES

//////////////////////////// PATIENT SIDE ///////////////////////////////////

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
        console.log("Accounts page loaded.")

    }
  }
 )



FlowRouter.route( '/dashboard',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "show_dashboard_page",
                                        footer: "footer_temp"});
        console.log("Dashboard page loaded.")

    }
  }
 )


FlowRouter.route( '/history',{

    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "reservePage",
                                        footer: "footer_temp"});
        console.log("History loaded.")
    }
  }
 )

//////////////////////////// PROVIDER SIDE ///////////////////////////////////

FlowRouter.route( '/dashboard_provider',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                        main: "dashboard_provider",
                                        footer: "footer_temp"});
        console.log("Provider dashboard loaded.")
    }
  }
 )

FlowRouter.route( '/provider/account',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                        main: "profile_provider",
                                        footer: "footer_temp"});
        console.log("Provider profile loaded.")
    }
  }
 )

FlowRouter.route( '/provider/clients',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                       // main: 'calendarEvents',
                                        bottom: "clientListPage",
                                        footer: "footer_temp"});

        console.log("Provider clients loaded.")

    }
  }
 )