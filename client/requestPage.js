
Template.requestPage.onRendered(
	function(){
		this.$('.ui.form').form({
			inline: true,
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