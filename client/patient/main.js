import { Accounts } from 'meteor/accounts-base'

// Template for handling user login with semantic ui
Template.main_page.onRendered(function(){
	var valid = false;

	if (Meteor.user()){
		console.log('user is logged in')
		// Meteor.users.update( {_id: Meteor.userId()}, {$set: {'profile.status':1,'profile.viewing': 'request'}})
		FlowRouter.go('/dashboard')
		
	}

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
					FlowRouter.go('/dashboard');
				}
			})
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
	});

	// Input mask for phone number for the format (XXX) XXX-XXXX
	$("#phonenumber").inputmask({"mask": "(999) 999-9999"});

	$('#registerForm').form({
		inline: true,
		on: 'blur',
		transition: 'slide down',
		keyboardShortcuts: true,

		onSuccess: function(event,fields){
			event.preventDefault();

			var streetTrim = fields.street.trim();
			var aptNumSuiteTrim = fields.aptNumSuite.trim();
			var cityTrim = fields.city.trim();
			var stateTrim = fields.state.trim();
			var zipTrim = fields.zipcode.trim();

			CheckValidAddress(streetTrim, cityTrim, stateTrim, zipTrim, fields.country);

			setTimeout(function(){
				if (valid) {
					$("#successMsg").show(500);
					$("#successMsg").delay(1000).fadeOut(500);

					var emailTrim = fields.new_email.trim();

					var ret = PatientEmails.findOne({'email':emailTrim});

					console.log(ret);

					if (ret == undefined) {
						Accounts.createUser({
							email: emailTrim,
							password: fields.new_password,
							createdAt: new Date().toLocaleString(),
							profile: {
								curStep: 'Request',
								status: 1,
								viewing: 'Request'
							}
						});

						Meteor.call('addPatientEmail', emailTrim);

						var fullAddress = streetTrim + ' ' + aptNumSuiteTrim + ' ' + cityTrim + ' ' + 
										  stateTrim + ' ' + zipTrim + ' ' + fields.country;

						var firstTrim = fields.firstname.trim();
						var lastTrim = fields.lastname.trim();
						var phoneStrip = fields.phonenumber.replace('(', "").replace(')', "").replace(' ', '').replace('-', '');
						var phoneNum = parseInt(phoneStrip);

						Session.set('firstname', firstTrim);
						Session.set('lastname', lastTrim);
						Session.set('fullAddress', fullAddress);
						Session.set('phonenumber', fields.phonenumber);

						Meteor.call('addProfile', emailTrim, firstTrim, lastTrim, phoneNum, fullAddress, fields.birthday, fields.gender);

						Meteor.call('addPatient', emailTrim);
						
						console.log('Account created.....');
						console.log(fields);

						$("#createAccountModal").modal('hide');

						FlowRouter.go('/dashboard');
					}
				}

			},500);

			
		},

		////////////////////////////// FORM VALIDATION /////////////////////////////////
		fields: {
			firstname: {
				identifier : 'firstname',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a first name.'
				},
				{
					type: 'regExp[/^[a-zA-Z]{3,20}$/]',
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
					type: 'regExp[/^[a-zA-Z]{2,20}$/]',
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
			gender: {
				identifier: 'gender',
				rules: [
				{
					type: 'empty',
					prompt: 'Please specify your gender.'
				}
				]
			},
			street:{
                identifier: 'street',
                rules:[
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
                    type: 'empty',
                    prompt: 'Please enter a city.'
                }
                ]
            },
            state:{
                identifier: 'state',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please enter a state.'
                }
                ]
            },
            country:{
            	identifier: 'country',
            	rules:[
            	{
            		type: 'empty',
            		prompt: 'Please select a country.'
            	}
            	]
            },
            zipcode:{
                identifier: 'zipcode',
                rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter a zip code.'
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
