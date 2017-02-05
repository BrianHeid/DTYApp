/*
	Meteor methods for updating Meteor.users
	 to setName, setPhone, setBirthday, and setAddress.
*/

//export const test = new Mongo.collections('test')

//import { Email } from 'meteor/email'

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

	'email': function(to, from, subject, body){
		Email.send({
			to: to,
			from: from,
			subject: subject,
			body: body
		});
	},
});


/* Phone validation function */
function validatePhone(fld) {
    var error = "";
    var stripped = fld.value.replace(/[\(\)\.\-\ ]/g, '');
 
   if (fld.value == "") {
        error = "You didn't enter a phone number.\n";
        fld.style.background = 'Yellow';
        alert(error);
		return false;
 
    } else if (isNaN(parseInt(stripped))) {
        error = "The phone number contains illegal characters. Don't include dash (-)\n";
        fld.style.background = 'Yellow';
        alert(error);
		return false;
    } else if (!(stripped.length == 10)) {
        error = "The phone number is the wrong length. Make sure you included an area code. Don't include dash (-)\n";
        fld.style.background = 'Yellow';
        alert(error);
		return false;
    }
    return true;
}