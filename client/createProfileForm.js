/*
  Event for when the createProfileForm is submitted. 
  Will call the setName, setPhone, setBirthday, and setAddress functions
  to add to the Meteor.users database. 
*/
import { Accounts } from 'meteor/accounts-base'


Template.createProfileForm.events({
	'submit form': function(){
        event.preventDefault();
        var firstName = event.target.firstName.value;
        var lastName = event.target.lastName.value;
        Meteor.call('setName', firstName, lastName);

        var phoneNumber = event.target.phoneNumber.value;
        Meteor.call('setPhone', phoneNumber);

        var birthday = event.target.birthday.value;
        Meteor.call('setBirthday', birthday);

        var street = event.target.street.value;
        var city = event.target.city.value;
        var state = event.target.state.value;
        var country = event.target.country.value;
        var zipcode = event.target.zipcode.value;
        var roomNumSuite = event.target.roomNumSuite.value;
        Meteor.call('setAddress', street, city, state, country, zipcode, roomNumSuite);

    }
});



