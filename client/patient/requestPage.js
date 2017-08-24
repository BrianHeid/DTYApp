import '../../lib/collections.js'

Template.requestPage.onRendered(function(){
	var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());

	var valid = false;

	$('.ui.dropdown').dropdown();

	$("#relationship-form").hide();

	$("#myonoffswitch").click(function(){
		$('#relationship-form').toggle();
	});

	$("#phonenumber").inputmask({"mask": "(999) 999-9999"});

	//Age validation rule////////////////////////////////////
	/*$.fn.form.settings.rules.age = function(value, age) {
		console.log(age);
		console.log(value);
	    if(moment(value, "DD/MM/YYYY").isBefore(moment().subtract(parseInt(age, 10), "year"))){
	        return true;
	    }else{
	        return true;
	    }
	};*/


/*	// Sets the date minimum to today's date
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var mins = today.getMinutes();
	var ampm = hh >= 12 ? "PM" : "AM";

	hh = hh %= 12;

	if (hh < 10) {
		hh = "0" + hh;
	}

	if (mins < 10) {
		mins = "0" + mins;
	}

	var time = hh + ":" + mins + " " + ampm;

	 if(dd<10){
	        dd='0'+dd
	    }
	    if(mm<10){
	        mm='0'+mm
	    }

	today = yyyy+'-'+mm+'-'+dd;
	document.getElementById("date").setAttribute("min", today); */

	$('.ui.form').form({
		inline: true,
		on: 'blur',
		transition: 'slide down',
		keyboardShortcuts: true,

		onSuccess: function(event,fields){
			event.preventDefault();
			console.log(fields);

			// Checks that an address was inputted
			var streetTrim = fields.street.trim();
			var aptNumSuiteTrim = fields.aptNumSuite.trim();
			var cityTrim = fields.city.trim();
			var zipTrim = fields.zipcode.trim();

			var fullAddress = streetTrim + ' ' + aptNumSuiteTrim + ' ' + cityTrim + ' ' +
									  fields.activeStates + ' ' + zipTrim
			// Checks if address is valid before adding to database and moving forward with request
			CheckValidAddress(streetTrim, cityTrim, fields.activeStates, zipTrim);


			/// ADDRESS HAS TO BE VALID IN REGIONS!!! /////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			setTimeout(function(){
				if (valid) {

					////////////////// ADDS TO DATABASE ///////////////////////
					var firstName = Profiles.findOne({email: emailAddress}).firstname;
					var lastName = Profiles.findOne({email: emailAddress}).lastname;
					var requesterName =  firstName + " " + lastName;

					fields.date = moment().format('YYYY MMMM DD');
					fields.time = moment().format('h:mm a');

					Meteor.call('pushRequest', Meteor.userId(), fields, requesterName, function(error, result){
						if(error){
							console.log(error);
						}else{
							$("#successMsg").show(500);
							var willSendSMS = Profiles.findOne({email: emailAddress}).preferences;

							if (willSendSMS) {
								Meteor.call('sendSMS',{
									to: '+1' + fields.phonenumber,
									text: firstName + ', we\'ve received your request and you are being connected to one of our on-call providers.'
								});
							}


							Meteor.call('sendEmail',{
							to: emailAddress,
							from: 'no-reply@doctorstoyouapp.com',
							subject: 'Doctors To You: Request sent',
							text: '',
							html:"Dear " + firstName +", <br><br>Thank you for sending a request to Doctors To You. Please standby for a provider to accept your request. You will receive a call shortly."
							});

							FlowRouter.go('/dashboard');
						}
						
					});
					//////////////////////////////////////////////////////////


				}
			},500);
		},

		////////////////////////////// FORM VALIDATION /////////////////////////////////
		fields: {
			relationship: {
				identifier: 'relationship',
				depends: 'for_someone_else',
				rules:[
				{
					type: 'empty',
					prompt: "Please specify your relationship."
				}
				]
			},
			tempPatientFirstName: {
				identifier: 'tempPatientFirstName',
				depends: 'for_someone_else',
				rules:[
				{
					type: 'empty',
					prompt: "Please specify a first name."
				}
				]
			},
			tempPatientLastName: {
				identifier: 'tempPatientLastName',
				depends: 'for_someone_else',
				rules:[
				{
					type: 'empty',
					prompt: "Please specify a last name."
				}
				]
			},
			street:{
                identifier: 'street',
                depends: 'different_address',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please enter a street address.'
                }
                ]
            },
            city:{
                identifier: 'city',
                depends: 'different_address',
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
                identifier: 'states',
                depends: 'different_address',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please choose a state.'
                }
                ]
            },
            zipcode:{
                identifier: 'zipcode',
                depends: 'different_address',
                rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter a zip code.'
                },
                {
					type: 'regExp[/^[0-9]{5}$/]',
					prompt: "Please enter a valid zip code."
				}
                ]
            },
            aptNumSuite:{
                identifier: 'aptNumSuite',
                optional: true,
                rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter an apartment or suite number.'
                }
                ]
            },
			symptoms: {
				identifier: 'symptoms',
				rules: [
				{
					type: 'empty',
					prompt: 'Please let us know your symptoms.'
				},
				{
					type: "minLength[10]",
					prompt: "Please enter at least 10 characters."
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
				}/*,
				{
					type: 'age[18]',
					prompt: 'You need to be at least 18'
				}*/
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
			}
		}
	});

	function CheckValidAddress(street,city,state,zip) {
		var streetAdd = street.trim();
		var cityAdd = city.trim();
		var stateAdd = state;
		var zipAdd = zip;

 		// Merges the address into one string to query the Geocoder
		var address = streetAdd + " " + cityAdd + " " + stateAdd + " " + zipAdd;

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

                    document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
					$("#errorMsg").show();
                    valid = false;
                    break;
                case google.maps.GeocoderStatus.ERROR:
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');

                    document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
					$("#errorMsg").show();
                    valid = false;
                    break;
                case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');

					document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
					$("#errorMsg").show();
                    valid = false;
                    break;
       		}
       	});
	}
});

Template.requestPage.helpers({
	attributes: function(){
		var dateLimit = moment().subtract(18, 'years').format('YYYY-M-D');
		console.log("Date Limit");
		console.log(dateLimit);
		return {
			type: "date",
			name: "birthday",
			min: "1887-01-01",
			max: dateLimit
		};


		//type="date" name="birthday" min= max={{dateLimit}}
	}
});
