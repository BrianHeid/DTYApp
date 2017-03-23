/*
	Meteor methods for updating Meteor.users
	 to setName, setPhone, setBirthday, and setAddress.
	 */

//export const test = new Mongo.collections('test')

import { Email } from 'meteor/email'
import  './collections.js'


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
	},

	pushRequest: function(id, info){
		// pushes patient request into Requests collection
		account = Meteor.users.find(id).fetch
		firstName = account.profile.firstname
		lastName = account.profile.lastname
		email = account.emails[0].address

		info.firstName = firstName
		info.lastName = lastName
		info.email = email

		if (Requests.find({_id:id})){
			Requests.update(id, {$set: {
				'info':info, 
				"datetime": new Date().toLocaleString(), 
				"treated": false,
				"accepted": false
			}})
		}
		else{
			Requests.insert({_id:id , 'info':info})
		}
		
	},

	getClients: function(){
		return Meteor.users.find().fetch()
	},

	findClient: function(id){
		return Meteor.users.find({_id: id}).fetch()
	},

	updateProfile: function(id, address, phonenumber, birthday){
		Meteor.users.update(id, {$set: {
			'profile.address': address, 
			'profile.phonenumber': phonenumber,
			'profile.birthdate': birthday
		}})
	},

	updateStatus: function(id){
		Meteor.users.update(id, {$inc: {'profile.status':1}})
	},

	updateView: function(id, view){
		Meteor.users.update(id, {$set: {'profile.viewing': view}})
	},

	
	addEvent( event ) {
		check( event, 
			{
				title: String,
				start: String,
				end: String,
				type: String,
				guests: Number
			});

			try {
				console.log('adding Event')
				return Events.insert( event );
			} catch ( exception ) {
				throw new Meteor.Error( '500', `${ exception }` );
			}
	},

	editEvent( event ) {
		check( event, {
			_id: String,
			title: Match.Optional( String ),
			start: String,
			end: String,
			type: Match.Optional( String ),
			guests: Match.Optional( Number )
		});

		try {
			return Events.update( event._id, {
				$set: event
			});
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	},

	removeEvent( event ) {
		check( event, String );

		try {
			return Events.remove( event );
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	}
	

});