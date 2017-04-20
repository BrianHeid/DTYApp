import '../../lib/collections.js'

Template.requestPage.onRendered(
	function(){
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

				////////////////// ADDS TO DATABASE ///////////////////////
				Meteor.call('updateStatus', Meteor.userId())
				Meteor.call('pushRequest', Meteor.userId(), fields)
				//////////////////////////////////////////////////////////
			},

			/////////////////////// FORM VALIDATION //////////////////////
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
		})
	}
	)