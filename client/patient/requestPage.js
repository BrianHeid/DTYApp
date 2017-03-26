import '../../lib/collections.js'

Template.requestPage.onRendered(
	function(){
		$("#relationship-form").hide();

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

		// Dropdown functionality
		$('.ui.dropdown').dropdown();


		this.$('.ui.form').form({
			inline: true,
			on: 'blur',
			transition: 'slide down',
			onSuccess: function(event,fields){
				event.preventDefault();

				////////////////// ADDS TO DATABASE ///////////////////////
				Meteor.call('updateStatus', Meteor.userId())
				Meteor.call('pushRequest', Meteor.userId(), fields)
				//////////////////////////////////////////////////////////

				FlowRouter.go('/dashboard') // Redirects to dashboard
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
				street:{
	                identifier: 'street',
	                required: {
						depends: function(element) {
							if ($('#myonoffswitch-address').is(':checked')){
								return false;
						}else{
								return true;
						}
						}
					},
	                rules:[
	                {
	                    type: 'empty',
	                    prompt: 'Please enter a street address.'
	                }
	                ]
	            },
	            city:{
	                identifier: 'city',
	                required: {
						depends: function(element) {
							if ($('#myonoffswitch-address').is(':checked')){
								return false;
						}else{
								return true;
						}
						}
					},
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
	                required: {
						depends: function(element) {
							if ($('#myonoffswitch-address').is(':checked')){
								return false;
						}else{
								return true;
						}
						}
					},
	                rules:[
	                {
	                    type: 'empty',
	                    prompt: 'Please enter a state.'
	                }
	                ]
	            },
	            country:{
	                identifier: 'country',
	                required: {
						depends: function(element) {
							if ($('#myonoffswitch-address').is(':checked')){
								return false;
						}else{
								return true;
						}
						}
					},
	                rules:[
	                {
	                    type: 'empty',
	                    prompt: 'Please choose a country.'
	                }
	                ]
	            },
	            zipcode:{
	                identifier: 'zipcode',
	                required: {
						depends: function(element) {
							if ($('#myonoffswitch-address').is(':checked')){
								return false;
						}else{
								return true;
						}
						}
					},
	                rules: [
	                {
	                    type: 'empty',
	                    prompt: 'Please enter a zip code.'
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
	                required: {
						depends: function(element) {
							if ($('#myonoffswitch-time').is(':checked')){
								return false;
						}else{
								return true;
						}
						}
					},
	                rules:[
	                {
	                    type: 'empty',
	                    prompt: 'Please choose a date.'
	                }
	                ]
	            },
	            time:{
	                identifier: 'time',
	                required: {
						depends: function(element) {
							if ($('#myonoffswitch-time').is(':checked')){
								return false;
						}else{
								return true;
						}
						}
					},
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
					}
					]
				}
			}
		})
	}
	)