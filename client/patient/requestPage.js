import '../lib/collections.js'

Template.requestPage.onRendered(
	function(){
		this.$('.ui.dropdown').hide()
		
		this.$('.ui.checkbox').checkbox({
			onChecked: function(){
				$('.ui.dropdown').show()
				
			
			},
			onUnchecked: function(){
				$('.ui.dropdown').hide()
			}
			})
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