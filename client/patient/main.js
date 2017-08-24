import { Accounts } from 'meteor/accounts-base'


// Template for handling user login with semantic ui
Template.main_page.onRendered(function(){
	var valid = true;

	if (Meteor.user()){
		console.log('user is logged in')
		
		if (Meteor.call('isProvider', Meteor.userId())) {
			console.log('user is a provider');
            FlowRouter.go('/provider/clients');
        }
		console.log('user is a patient');
		FlowRouter.go('/dashboard')
		
	}

	$("#reset").click(function(){
		$('#sentMsg').hide();
		$('#resetModal').modal('show');
		$("#resetForm").form('clear');
	});

	$("#resetClose").click(function(){
		$("#resetForm").form('clear');
		$("#resetModal").modal('hide');
		$("#resetMsg").hide();
	});

	$("#resetCancel").click(function(){
		$("#resetForm").form('clear');
		$("#resetModal").modal('hide');
		$("#resetMsg").hide();
	});

	this.$('#resetForm').form({
		inline: true,
		on: 'change',
		transition: 'slide down',

		onSuccess: function(event, fields){
			event.preventDefault()
			Accounts.forgotPassword({email: fields['resetemail']},(error, result)=>{
				if(error){
					$('#resetMsg').show().transition('bounce');
					document.getElementById("innerResetMsg").innerHTML = "<i class=\"warning circle icon\"></i>Oh no! Email not found.";
					console.log(error.message);
				}
				else {
					$("#resetMsg").hide();
					console.log('Reset email sent');
					$("#resetModal").modal('hide');
					$('#sentMsg').show();
					document.getElementById("innerSentMsg").innerHTML = "<p>Password reset instructions have been sent to your email.</p>";
				}
			});
		},

		// validate email address
		fields: {
			resetemail: {
				identifier : 'resetemail',
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
			}
		}
	});

	
			

	this.$('#loginForm').form({
		inline: true,
		on: 'submit',
		transition: 'slide down',
		keyboardShortcuts: true,

		onSuccess: function(event,fields){
			event.preventDefault()
	
			Meteor.loginWithPassword(fields['email'],fields['password'],(error,result)=>{
				if(error){
					document.getElementById("innerLoginErrorMsg").innerHTML = "<i class=\"warning circle icon\"></i>Oh no! Email or password is incorrect.";
					$('#loginErrorMsg').show().transition('bounce');
				}
				else{
					$("#loginErrorMsg").hide();
					console.log('Login was successful');

					var isProvider = Providers.findOne({'email':fields.email});
					
					if (isProvider != undefined) {
						var isAdmin = Admins.findOne({_id:isProvider._id});
						if (isAdmin != undefined) {
							console.log('Logged in as admin');
	                        FlowRouter.go('/admin');
	                    } else {
							console.log('Logged in as provider');
							FlowRouter.go('/provider/clients');
						}
	                } else {
						console.log('Logged in as patient');
						FlowRouter.go('/dashboard');
					}	
				}
				

			});
		},

		////////////////////////////// FORM VALIDATION /////////////////////////////////
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

	$('.ui.dropdown').dropdown();

	// Prevents clicking outside the modal to close
	$("#register").click(function(){
		$("#createAccountModal").modal({
		    closable  : false,
		    transition: 'fade'
		}).modal('show');
	});

	// Canceling the modal will clear the form and hide the modal
	$("#cancelBtn").click(function(){
		$("#registerForm").form('clear');
		$("#createAccountModal").modal('hide');
		$("#errorMsg").hide();
	});

	$('#registerForm').form({
		inline: true,
		on: 'blur',
		transition: 'slide down',
		keyboardShortcuts: true,

		onSuccess: function(event,fields){
			event.preventDefault();

		/*	var streetTrim = fields.street.trim();
			var aptNumSuiteTrim = fields.aptNumSuite.trim();
			var cityTrim = fields.city.trim();
			var stateTrim = fields.state.trim();
			var zipTrim = fields.zipcode.trim();

			CheckValidAddress(streetTrim, cityTrim, stateTrim, zipTrim, fields.country); */

			setTimeout(function(){
				if (valid) {
					var emailTrim = fields.new_email.trim();

					var ret = PatientEmails.findOne({'email':emailTrim});

					if (ret == undefined) {
						Accounts.createUser({
							email: emailTrim,
							password: fields.new_password,
							createdAt: new Date().toLocaleString()
						});



						Meteor.call('addPatientEmail', emailTrim);

					/*	var fullAddress = streetTrim + ' ' + aptNumSuiteTrim + ' ' + cityTrim + ' ' + 
										  stateTrim + ' ' + zipTrim + ' ' + fields.country;


						var phoneStrip = fields.phonenumber.replace('(', "").replace(')', "").replace(' ', '').replace('-', '');
						var phoneNum = parseInt(phoneStrip); */
						var firstTrim = fields.firstname.trim();
						var lastTrim = fields.lastname.trim();
							
						Meteor.call('addProfile', emailTrim, firstTrim, lastTrim);
						
					
						console.log('Account created.....');
						console.log(fields);


						// TEMPORARY TEMPORARY TEMPORARY
			            // Allows user to make themselves an administrator

			            //TEMPORARY TEMPORARY


						$("#successMsg").show(500);
						$("#successMsg").delay(1000).fadeOut(500);
						setTimeout(function(){$("#createAccountModal").modal('hide');}, 500); 

						setTimeout(function(){FlowRouter.go('/dashboard');}, 2000);
					} else {
						document.getElementById("errorList").innerHTML = "<li>Email already exists!</li>";
						$("#errorMsg").show();
					}
				}

			}, 500);

			
		},

		////////////////////////////// FORM VALIDATION /////////////////////////////////
		fields: {
			firstname: {
				identifier : 'firstname',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a first name.'
				}
				]
			},
			lastname: {
				identifier: 'lastname',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a last name.'
				}
				]
			},
			new_email: {
				identifier : 'new_email',
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
			new_password: {
				identifier : 'new_password',
				rules: [
					{
						type: 'minLength[6]',
						prompt: 'Your password must be at least 6 characters'
					}
				]
			},
			password_confirm: {
				identifier: 'password_confirm',
				rules: [
					{
						type: 'match[new_password]',
						prompt: 'Password does not match.'
					}
				]
			},
			acquisition: {
				identifier: 'acquisition',
				rules: [
					{
						type: 'empty',
						prompt: 'Please select one.'
					}
				]
			}
		}
	});

	function CheckValidAddress(street,city,state,zip,country) {
		var streetAdd = street.trim();
		var cityAdd = city.trim();
		var stateAdd = state;
		var zipAdd = zip;
		var countryAdd = country;

 		// Merges the address into one string to query the Geocoder
		var address = streetAdd + " " + cityAdd + " " + stateAdd + " " + zipAdd + " " + countryAdd;

        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            switch (status) {
                case google.maps.GeocoderStatus.OK:
					$("#errorMsg").hide();
                    valid = true;
                    break;
                case google.maps.GeocoderStatus.ZERO_RESULTS:
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    $("#aptNumSuite").val('');

                    document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
					$("#errorMsg").show();
                    valid = false;
                    break;
                case google.maps.GeocoderStatus.ERROR:
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    $("#aptNumSuite").val('');

                    document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
					$("#errorMsg").show();
                    valid = false;
                    break;
                case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    $("#aptNumSuite").val('');

					document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
					$("#errorMsg").show();
                    valid = false;
                    break;
       		}
       	});
	}
});

Template.entrance.events({
	'click #oldpatient': function(){
		FlowRouter.go('/login');
	},
	'click #newpatient': function(){
		FlowRouter.go('/newuser');
	}
});

Template.newuser.onRendered(function(){
$('#createForm').form({
		inline: true,
		on: 'blur',
		transition: 'slide down',
		keyboardShortcuts: true,

		onSuccess: function(event,fields){
			event.preventDefault();

		/*	var streetTrim = fields.street.trim();
			var aptNumSuiteTrim = fields.aptNumSuite.trim();
			var cityTrim = fields.city.trim();
			var stateTrim = fields.state.trim();
			var zipTrim = fields.zipcode.trim();

			CheckValidAddress(streetTrim, cityTrim, stateTrim, zipTrim, fields.country); */

			setTimeout(function(){

				var emailTrim = fields.email.trim();

				var ret = PatientEmails.findOne({'email':emailTrim});

				if (ret == undefined) {
					Accounts.createUser({
						email: emailTrim,
						password: fields.password,
						createdAt: new Date().toLocaleString()
					});



					Meteor.call('addPatientEmail', emailTrim);

				/*	var fullAddress = streetTrim + ' ' + aptNumSuiteTrim + ' ' + cityTrim + ' ' + 
									  stateTrim + ' ' + zipTrim + ' ' + fields.country;


					var phoneStrip = fields.phonenumber.replace('(', "").replace(')', "").replace(' ', '').replace('-', '');
					var phoneNum = parseInt(phoneStrip); */
					var firstTrim = fields.firstname.trim();
					var lastTrim = fields.lastname.trim();
						
					Meteor.call('addProfile', emailTrim, firstTrim, lastTrim);
					
				
					console.log('Account created.....');
					console.log(fields);


					// TEMPORARY TEMPORARY TEMPORARY
		            // Allows user to make themselves an administrator

		            //TEMPORARY TEMPORARY


					$("#successMsg").show(500);
					$("#successMsg").delay(1000).fadeOut(500);
					setTimeout(function(){$("#createAccountModal").modal('hide');}, 500); 

					setTimeout(function(){FlowRouter.go('/dashboard');}, 2000);
				} else {
					document.getElementById("errorList").innerHTML = "<li>Email already exists!</li>";
					$("#errorMsg").show();
				}
				

			}, 500);

			
		},

		////////////////////////////// FORM VALIDATION /////////////////////////////////
		fields: {
			firstname: {
				identifier : 'firstname',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a first name.'
				}
				]
			},
			lastname: {
				identifier: 'lastname',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a last name.'
				}
				]
			},
			new_email: {
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
			new_password: {
				identifier : 'password',
				rules: [
					{
						type: 'minLength[6]',
						prompt: 'Your password must be at least 6 characters'
					}
				]
			},
			password_confirm: {
				identifier: 'confirmpassword',
				rules: [
					{
						type: 'match[password]',
						prompt: 'Password does not match.'
					}
				]
			},
			acquisition: {
				identifier: 'acquisition',
				rules: [
					{
						type: 'empty',
						prompt: 'Please select one.'
					}
				]
			}
		}
	});
});
