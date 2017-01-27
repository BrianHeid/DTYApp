Accounts.onLogin(
    function(){
    	console.log(Accounts.user())
        FlowRouter.go('/new_account')
    }
)