/*
	Meteor methods for updating Meteor.users
	 to setName, setPhone, setBirthday, and setAddress.
*/

//export const test = new Mongo.collections('test')

import { Email } from 'meteor/email'

Meteor.methods({
	'setName': function(first, last){
		check(first, String);
		check(last, String);

		const newName = {
			firstName: first,
			lastName: last
		};

		Meteor.users.update(Meteor.userId(), {$set: {'profile.fullName': newName}});
	},

	'setPhone': function(phoneNumber){
		Meteor.users.update(Meteor.userId(), {$set: {'profile.phone': phoneNumber}});
	},

	'setBirthday': function( birthday){
		Meteor.users.update(Meteor.userId(), {$set: {'profile.birthdayDate': birthday}});
	},

	'setAddress': function(street, city, state, country, zipcode, aptNumSuite){
		check(street, String);
		check(city, String);
		check(state, String);
		check(zipcode, Number);
		check(aptNumSuite, Number);

		const newFullAddress = {
		  addressCountry: country,
		  addressCity: city,
		  addressState: state,
		  postalCode: zipcode,
		  streetAddress: street,
		  addressAptNumSuite: aptNumSuite
		};

		Meteor.users.update(Meteor.userId(), {$set: {'profile.fullAddress': newFullAddress}});

	},

	email: function(to, from, subject, body){
		this.unblock()

		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: body
		});
	},
});

Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
