Template.adminHome.onRendered(function(){
//  var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
//  Meteor.subscribe("currProfile", emailAddress);
//  console.log(emailAddress);
  console.log("OnRender");
  // Forces the user back to login screen if they are not a registered administrator.
  console.log(Meteor.user());
  $('.tabular.menu .item').tab(); 
 /* if (Meteor.user() != undefined){
    var userEmail = Meteor.call('getEmail', Meteor.userId());
    console.log("userEmail");
    console.log(userEmail);   
    if (Meteor.call('isAdmin', email)) {
      console.log('user is an admin');
    }
    else{
      console.log('user is not an admin');
      FlowRouter.go('/dashboard');
    }
  }
  else{
    FlowRouter.go('/');
  } */

});



Template.adminHome.helpers({
   adminName: function(){
        var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
        console.log(emailAddress);
        console.log("helper"); 
        return Profiles.findOne({email: emailAddress}).firstname;
   }
});

Template.adminHome.events({
  'click #shiftTab': function( ){
      $('#shifts-calendar').fullCalendar('render');
  }

});
