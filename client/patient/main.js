import { Accounts } from 'meteor/accounts-base'




// Template for handling user login with semantic ui
Template.main_page.onRendered(function(){
		if (Meteor.user()){
			console.log('user is logged in')
			Meteor.users.update( {_id: Meteor.userId()}, {$set: {'profile.status':1,'profile.viewing': 'request'}})
			FlowRouter.go('/dashboard')
			
		}
		this.$('.ui.form').form({
			inline: true,
			on: 'blur',
			transition: 'slide down',
			onSuccess: function(event,fields ){
				event.preventDefault()
		
				Meteor.loginWithPassword(fields['email'],fields['password'],(error,result)=>{
					if(error){
						//$('#error_message').html('<div class="ui negative">')
						$('#error_message').show()
						$('#error_message').html("<div class='header'>" + 'Please try again' + '</div>' + '<p>' + error['reason'] + "</p>")
					}
					else{
						console.log('Login was successful',result);
						FlowRouter.go('/dashboard')
					}
				})

			},
			fields: {
				email: {
					identifier : 'email',
					rules: [
					{
						type: 'empty',
						prompt: 'Please enter your e-mail'
					},
					{
						type: 'email',
						prompt: 'Please enter a valid e-mail'
					}
					]
				},
				password: {
					identifier : 'password',
					rules: [
						{
							type: 'empty',
							prompt: 'Please enter your password'
						},
						{
							type: 'length[6]',
							prompt: 'Your password must be at least 6 characters'
						}
					]
			}
		}},
		)
		this.$('#register').click(
			function(){
				        BlazeLayout.render("App_body", {header: "header_temp",
                                        main: "create_account",
                                        footer: "footer_temp"});
			}
			)
	});


// Handle for account creation.
/*
	On a successful account creation, users are added to the Meteor.users mongo collection.
	Users are initialized with their name, email, and a status number that indicates where the account is in the requesting process.
*/ 
Template.create_account.onRendered(function(){
	this.$('#login').click(
		function(){
	        BlazeLayout.render("App_body", {header: "header_temp",
                                main: "main_page",
                                footer: "footer_temp"});
		})
	this.$('.ui.form').form({
			inline: true,
			on: 'blur',
			transition: 'slide down',
			onSuccess: function(event,fields){
				event.preventDefault()
				Accounts.createUser({
					email: fields['email'],
					password: fields['password'],
					profile: {
						firstname: fields['firstname'],
						lastname: fields['lastname'],
						status: 1,
					}
				})
				console.log('Account created.....')
				FlowRouter.go('/account')
			},
			fields: {
				firstname: {
					identifier : 'firstname',
					rules: [
					{
						type: 'empty',
						prompt: 'Please enter a first name.'
					},
					{
						type: 'regExp[/^[a-zA-Z]{4,20}$/]',
						prompt: 'Please enter a valid name.'
					}
					]
				},
				lastname: {
					identifier: 'lastname',
					rules: [
					{
						type: 'empty',
						prompt: 'Please enter a last name.'
					},
					{
						type: 'regExp[/^[a-zA-Z]{4,20}$/]',
						prompt: 'Please enter a valid name.'
					}
					]
				},
				email: {
					identifier : 'email',
					rules: [
					{
						type: 'empty',
						prompt: 'Please enter your e-mail'
					},
					{
						type: 'email',
						prompt: 'Please enter a valid e-mail'
					}
					]
				},
				password: {
					identifier : 'password',
					rules: [
						{
							type: 'empty',
							prompt: 'Please enter your password'
						},
						{
							type: 'length[6]',
							prompt: 'Your password must be at least 6 characters'
						}
					]
				},
				password_confirm: {
					identifier: 'password_confirm',
					rules: [
						{
							type: 'empty',
							prompt: 'Please enter in your password again.'
						},
						{
							type: 'match[password]',
							prompt: 'Password does not match'
						}
					]
				}
		}
	})

});


