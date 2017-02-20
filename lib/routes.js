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


FlowRouter.route( '/call',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "callPage",
                                        footer: "footer_temp"});
        console.log("callPage loaded.")

    }
  }
 )


FlowRouter.route( '/reserve',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "reservePage",
                                        footer: "footer_temp"});
        console.log("reservePage loaded.")

    }
  }
 )

FlowRouter.route( '/treatment',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "treatmentPage",
                                        footer: "footer_temp"});
        console.log("treatmentPage loaded.")

    }
  }
 )

FlowRouter.route( '/followup',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "followupPage",
                                        footer: "footer_temp"});
        console.log("followupPage loaded.")

    }
  }
 )

FlowRouter.route( '/followup2',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "followupPage2",
                                        footer: "footer_temp"});
        console.log("followupPage2 loaded.")

    }
  }
 )


//////////////////////////// PROVIDER SIDE ///////////////////////////////////

FlowRouter.route( '/dashboard_provider',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                        main: "dashboard_provider",
                                        footer: "footer_temp"});
        console.log("Provider dashabord loaded.")
    }
  }
 )