import { Mongo } from 'meteor/mongo';

/*
	Current collections:
	set to top level in mongo for search queries
		User profiles
				: name
				: userName
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

		Prompts
			// Set a collection of prompts that can be adjusted by super users to modify hard coded text such as 'request'

*/

//export const Documents = new Mongo.Collection('User_Documents')
//export const Reviews = new Mongo.Collection('Reviews')
Requests = new Mongo.Collection('Requests');
Privilege = new Mongo.Collection('Privilege');
Events = new Mongo.Collection( 'events' );


