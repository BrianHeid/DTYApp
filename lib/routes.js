// ROUTES

//////////////////////////// PATIENT SIDE ///////////////////////////////////

FlowRouter.route( '/',{
	action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "main_page",
                                        footer: "footer_temp"});

        console.log("main_page loaded.")
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

FlowRouter.route( '/request',{

    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "processingRequestPage",
                                        footer: "footer_temp"});
        console.log("Request loaded.")
    }
  }
 )

FlowRouter.route( '/request/overview',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "requestOverview",
                                        footer: "footer_temp"});

        console.log("Request overview page loaded.")
    }
  }
 )

FlowRouter.route( '/call/estimate',{

    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "callEstimate",
                                        footer: "footer_temp"});
        console.log("Request loaded.")
    }
  }
 )

FlowRouter.route( '/call/overview',{

    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "callOverview",
                                        footer: "footer_temp"});
        console.log("Request loaded.")
    }
  }
 )

FlowRouter.route( '/reserve',{

    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "reservePage",
                                        footer: "footer_temp"});
        console.log("Reserve loaded.")
    }
  }
 )

FlowRouter.route( '/reserve/overview',{

    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "reserveOverview",
                                        footer: "footer_temp"});
        console.log("Reserve loaded.")
    }
  }
 )

FlowRouter.route( '/followup2',{

    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "followupPage2",
                                        footer: "footer_temp"});
        console.log("Followup loaded.")
    }
  }
 )

FlowRouter.route( '/review',{

    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "reviewPage2",
                                        footer: "footer_temp"});
        console.log("Review loaded.")
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
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                       
                                        bottom: "clientListPage",
                                        footer: "footer_temp"});

        console.log("Provider clients loaded.")
    }
  }
 )

FlowRouter.route( '/provider/calendar',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                       main: "calendarEvents",
                                        footer: "footer_temp"});

        console.log("Provider calendar loaded.")
    }
  }
 )

FlowRouter.route( '/providerProfile',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                       main: "providerProfile",
                                        footer: "footer_temp"});

        console.log("Provider profiles loaded.")
    }
  }
 )

//////////////////////////// ADMIN SIDE ///////////////////////////////////

FlowRouter.route( '/admin',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                       main: "adminHome",
                                        footer: "footer_temp"});

        console.log("Admin home loaded.")
    }
  }
 )

FlowRouter.route( '/admin/shifts',{
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                       main: "adminCalendar",
                                        footer: "footer_temp"});

        console.log("Shift page loaded.")
    }
  }
 )

FlowRouter.route( '/braintree', {
    action: function(params) {
        BlazeLayout.render("App_body", {header: "header_temp_provider",
                                        main: "briantree",
                                        footer: "footer_temp"});
        console.log("Braintree page loaded.")
    }
})