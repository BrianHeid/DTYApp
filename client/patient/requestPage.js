import '../../lib/collections.js'

Template.requestPage.onRendered(function(){
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

	$('.ui.form').form({
		inline: true,
		on: 'blur',
		transition: 'slide down',
		keyboardShortcuts: true,

		onSuccess: function(event,fields){
			event.preventDefault();
			console.log(fields);

			// Checks if address is valid before adding to database and moving forward with request
			if (CheckValidAddress(fields['street'], fields['city'], fields['state'], fields['zipcode']) == true){
				////////////////// ADDS TO DATABASE ///////////////////////
					Meteor.call('updateStatus', Meteor.userId())
					Meteor.call('pushRequest', Meteor.userId(), fields)
				//////////////////////////////////////////////////////////
			} else {
				var node=document.createElement("LI");
				var textnode=document.createTextNode("Address is invalid!");
				node.appendChild(textnode);
				$("#errorList").append(node);
				$("#errorMsg").show();
			}
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
                    return true;
         			break;
                case google.maps.GeocoderStatus.ZERO_RESULTS:
                   	return false;
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    break;
                case google.maps.GeocoderStatus.ERROR:
                    return false;
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    break;
                case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                    return false;
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    break;
       	}});
	}
});