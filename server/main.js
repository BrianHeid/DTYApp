import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  // code to run on server at startup
//export const Documents = new Mongo.Collection('User_Documents')
//export const Reviews = new Mongo.Collection('Reviews')

});


Accounts.onCreateUser(
    function(options, user){

	user.profile = options.profile ? options.profile : {};
    
    return user

    });

/*
	Current collections:
	set to top level in mongo for search queries
		User profiles
				: isDoc
				: isAdmin
				: Basic profile
				: Settings
				; 
		Documents
				: 
		Reviews
				:
		Messages
				: From doc
				: From patient
				: Invoices

*/

