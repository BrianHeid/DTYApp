// Login functionality and validating

Accounts.onLogin(
    function(){
    	console.log(Accounts.user())
        FlowRouter.go('/new_account')
    })


// register a global helper to enable query search based on url state from any template
// e.g. allows list to be updated based on the url state such as with Dynamic messaging between two parties

Template.registerHelper('search', (search_id, target_field, target_collection)=>{

	search_string = FlowRouter.current().queryParams[search_id]

	return target_collection.find(target_field: search_string).fetch()


	});

 $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            email: {
              identifier  : 'email',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your e-mail'
                },
                {
                  type   : 'email',
                  prompt : 'Please enter a valid e-mail'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your password'
                },
                {
                  type   : 'length[6]',
                  prompt : 'Your password must be at least 6 characters'
                }
              ]
            }
          }
        })
      ;
    });

Template.main_page.onRendered(function(){
		this.$('.ui.form').form({
			inline: true,
			on: 'blur',
			transition: 'slide down',
			onSuccess: function(event,fields){
				event.preventDefault()
				console.log(fields)
				FlowRouter.go('/dashboard')
			},
			fields: {
				email: {
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
				password: {
					identifier : 'password',
					rules: [
						{
							type: 'empty',
							prompt: 'Please enter your password'
						},
						{
							type: 'length[6]',
							prompt: 'Your password must be at least 6 characters'
						}
					]
			}
		}},
		)
	});


Template.main_page.events({
	"submit .ui.form":function(event, template){
		console.log(template)
	    template.$(".ui.form").hide();
	}
});


