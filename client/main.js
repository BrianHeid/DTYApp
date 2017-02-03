Accounts.onLogin(
    function(){
    	console.log(Accounts.user())
        FlowRouter.go('/new_account')
    }
    )


// register a global helper to enable query search based on url state from any template
// e.g. allows list to be updated based on the url state such as with Dynamic messaging between two parties

Template.registerHelper('search', (search_id, target_field, target_collection)=>{

	search_string = FlowRouter.current().queryParams[search_id]

	return target_collection.find(target_field: search_string).fetch()


	});