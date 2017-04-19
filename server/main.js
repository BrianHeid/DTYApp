import { Meteor } from 'meteor/meteor';
import '../lib/collections.js'
// /imports/startup/server/mail-url.js

Meteor.startup(() => {
  // code to run on server at startup
//export const Documents = new Mongo.Collection('User_Documents')
//export const Reviews = new Mongo.Collection('Reviews')
// process.env.MAIL_URL = 'smtp://postmaster%40sandboxbab1a08279c84b34a1c96809281db21c.mailgun.org:7dfad06025cf2029c89f75b5c80e7b25@smtp.mailgun.org:587'
// Meteor.call('email','DoxToYou@gmail.com','DoxToYou@gmail.com','Test','Test 2 message')
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

