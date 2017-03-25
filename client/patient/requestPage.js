import '../../lib/collections.js'

Template.requestPage.onRendered(
	function(){
		$("#relationship-form").toggle().hide();

		$("#myonoffswitch").click(function(){
			$('#relationship-form').toggle();
		});

		// Click billing address toggle
		$("#myonoffswitch-address").click(function(){
			$('#address-form').toggle();
		});

		// Click billing address toggle
		$("#myonoffswitch-time").click(function(){
			$('#time-form').toggle();
		});

		// Dropdown functionality
		$('.ui.dropdown').dropdown();


		this.$('.ui.form').form({
			inline: true,
			onSuccess: function(event,fields){
				event.preventDefault()
				Meteor.call('updateStatus', Meteor.userId())
				Meteor.call('pushRequest', Meteor.userId(), fields)
				FlowRouter.go('/dashboard')
			},
			fields: 
			{
				symptoms:
					{
						identifier: 'symptoms',
						rules:
						[
							{
								type: 'empty',
								prompt: 'Please let us know your symptoms.'
							}
						]
					},
				relationship:
					{
						identifier: 'relationship',
						depends: 'for_someone_else',
						rules:
						[
							{
								type: 'empty',
								prompt: "Pleaase specify your relationship."
							}
						]
					}
			}
		})
	}
	)