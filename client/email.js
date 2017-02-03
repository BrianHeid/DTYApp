// meteor add email
import { Email } from 'meteor/email'



Template.notify_button.events({
	'click button': function(){
		to = 'Meteor.users.find(this.user).fetch().profile.email'
		from = 'admin@dty.com'
		subject = 'DoctorsToYou notification'
		body = 'Your request has been recieved' ? 'new event' : 'Here\'s an update:'+'reactive dictionary'

		meteor.call('email',to, from, subject, body)
		}
	});


/*
	Notification message templates:
		'Submit Request': 'Thank you for your request! your doctor will call you in approx.' + min + 'min.'
		'Reserve'		: 'You have now reserved' + doc_name + '. You will receive a call in approx.' + min + 'minutes.'
		'Reserve v2'	: 'You have now reserved' + name +  '. ' + he/she + 'is on the way. The estimated time of arrival is approx. ' + time
		'Follow-up'		: 'Your doctor will follow up with you on ' + date.time + 'at ' + time 'to make sure everything is OK.'
		'Invoice'		: 'Our clinical team has reviewed you care. You can now view and download your medicial report and invoice <a href>HERE</a>. '
*/