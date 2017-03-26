import { Accounts } from 'meteor/accounts-base'

// Template for handling user login with semantic ui
Template.main_page.onRendered(function(){
		if (Meteor.user()){
			console.log('user is logged in')
			Meteor.users.update( {_id: Meteor.userId()}, {$set: {'profile.status':1,'profile.viewing': 'request'}})
			FlowRouter.go('/dashboard')
			
		}
		this.$('#loginForm').form({
		inline: true,
		on: 'blur',
		transition: 'slide down',
		onSuccess: function(event,fields ){
			event.preventDefault()
	
			Meteor.loginWithPassword(fields['email'],fields['password'],(error,result)=>{
				if(error){
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
				rules: 
				[
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
				rules: 
				[
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
		}
	});

	// Handle for account creation.
	/*
		On a successful account creation, users are added to the Meteor.users mongo collection.
		Users are initialized with their name, email, and a status number that indicates where the account is in the requesting process.
	*/ 

	this.$('#registerForm').form({
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
						phonenumber: fields['phonenumber'],
						
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
				phonenumber: {
					identifier: 'phonenumber',
					rules: [
					{
						type: 'empty',
						prompt: 'Please enter your primary phone number.'
					},
					{
						type: 'regExp[/^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$/]',
						prompt: 'Please enter a valid phone number.'
					}
					]
				},
				birthday: {
					identifier: 'birthday',
					rules: [
					{
						type: 'empty',
						prompt: 'Please enter your birthday.'
					}
					]
				},
				street:{
	                identifier: 'street',
	                rules:[
	                {
	                    type: 'regExp[/^\\d [A-Za-z ]* (?:Rd\\.)|(?:Dr\\.)|(?:St\\.)|(?:Ct\\.)$/]',
	                    prompt: 'Please enter a valid street address.'
	                },
	                {
	                    type: 'empty',
	                    prompt: 'Please enter a street address.'
	                }
	                ]
	            },
	            city:{
	                identifier: 'city',
	                rules:[
	                {
	                    type: 'regExp[/^[A-Za-z]{0,144}$/]',
	                    prompt: 'Please enter a valid city.'
	                },
	                {
	                    type: 'empty',
	                    prompt: 'Please enter a city.'
	                }
	                ]
	            },
	            state:{
	                identifier: 'state',
	                rules:[
	                {
	                    type: 'regExp[/^[A-Za-z]{2}$/]',
	                    prompt: 'Please enter a valid state.'
	                },
	                {
	                    type: 'empty',
	                    prompt: 'Please enter a state.'
	                }
	                ]
	            },
	            zipcode:{
	                identifier: 'zipcode',
	                rules: [
	                {
	                    type: 'regExp[/^[0-9 ]{5}$/]',
	                    prompt: 'Please enter a valid zip code.'
	                },
	                {
	                    type: 'empty',
	                    prompt: 'Please enter a zip code.'
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
