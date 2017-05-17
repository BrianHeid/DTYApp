import '../../lib/collections.js'

Template.requestPage.onRendered(function(){
	var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());
	
	var valid = false;

	$('.ui.dropdown').dropdown();

	$("#relationship-form").hide();
	$("#address_form").hide();
	$("#time-form").hide();

	$("#myonoffswitch").click(function(){
		$('#relationship-form').toggle();
	});

	// Click billing address toggle
	$("#myonoffswitch-address").click(function(){
		$('#address_form').toggle();
	});

	// Click billing address toggle
	$("#myonoffswitch-time").click(function(){
		$('#time-form').toggle();
	});

	// Sets the date minimum to today's date
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
	document.getElementById("date").setAttribute("min", today);

	$('.ui.form').form({
		inline: true,
		on: 'blur',
		transition: 'slide down',
		keyboardShortcuts: true,

		onSuccess: function(event,fields){
			event.preventDefault();
			console.log(fields);

			// Checks that an address was inputted
			if (fields.different_address) {
				var streetTrim = fields.street.trim();
				var aptNumSuiteTrim = fields.aptNumSuite.trim();
				var cityTrim = fields.city.trim();
				var zipTrim = fields.zipcode.trim();

				var fullAddress = streetTrim + ' ' + aptNumSuiteTrim + ' ' + cityTrim + ' ' +
										  fields.activeStates + ' ' + zipTrim

				// Checks if address is valid before adding to database and moving forward with request
				CheckValidAddress(streetTrim, cityTrim, fields.activeStates, zipTrim);
			} else {
				$("#errorMsg").hide();
				valid = true;
			}

			/// ADDRESS HAS TO BE VALID IN REGIONS!!! /////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			setTimeout(function(){
				if (valid) {

					////////////////// ADDS TO DATABASE ///////////////////////
					var firstName = Profiles.findOne({email: emailAddress}).firstname;
					var lastName = Profiles.findOne({email: emailAddress}).lastname;
					var requesterName =  firstName + " " + lastName;
          
					if (!fields.laterTime) {
						fields.date = today;
						fields.time = time;
					}
					Meteor.call('pushRequest', Meteor.userId(), fields, requesterName);
					//////////////////////////////////////////////////////////
					
					$("#successMsg").show(500);
					Meteor.call('updateCurStep', Meteor.userId(), 'ProcessingRequest');
					Meteor.call('updateStatus', Meteor.userId(), 3);
					Meteor.call('updateView', Meteor.userId(), 'ProcessingRequest');
					// Meteor.call('sendSMS',{
					// 	to: '+16176509969',
					// 	text: 'This is a test message from DTY'
					// });
					FlowRouter.go('/dashboard');
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
					prompt: "Pleaase specify your relationship."
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
            date:{
                identifier: 'date',
                depends: 'laterTime',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please choose a date.'
                }
                ]
            },
            time:{
                identifier: 'time',
                depends: 'laterTime',
                rules: [
                {
                    type: 'empty',
                    prompt: 'Please choose a time.'
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
