/*
	Meteor methods for updating Meteor.users to setName, setPhone, setBirthday, and setAddress.
*/

Meteor.methods({
	'setName': function(first, last){
		check(first, String);
		check(last, String);

		const newName = {
			firstName: first,
			lastName: last
		};

		Meteor.users.update(userId, {$set: {fullName: newName}});
	},

	'setPhone': function(phoneNumber){
		Meteor.users.update(userId, {$set: {phone: phoneNumber}});
	},

	'setBirthday': function( birthday){
		Meteor.users.update(userId, {$set: {birthdayDate: birthday}});
	},

	'setAddress': function(street, city, state, country, zipcode, roomNumSuite){
		const newFullAddress = {
		  addressCountry: country,
		  addressCity: city,
		  addressState: state,
		  postalCode: zipcode,
		  streetAddress: street
		};

		Meteor.users.update(userId, {$set: {fullAddress: newFullAddress}});

	}
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