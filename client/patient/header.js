// LogOut button function to logout user and then redirect to login page

Template.menu_temp.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');
    }
});