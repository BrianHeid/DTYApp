import { Accounts } from 'meteor/accounts-base'




// Template for handling user login with semantic ui
Template.main_page.onRendered(function(){
		if (Meteor.user()){
			console.log('user is logged in')
			Meteor.users.update( {_id: Meteor.userId()}, {$set: {'profile.status':1,'profile.viewing': 'request'}})
			FlowRouter.go('/dashboard')
			
		}

		this.$("#register").click(function(){
				$("#createAccountModal").modal('setting', 'closable', false).modal('show');
			});

		this.$('.ui.dropdown').dropdown();

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


