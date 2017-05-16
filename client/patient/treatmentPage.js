Template.treatmentPage.onRendered(function(){
    
    var imageSrc = "/images/drbrown.jpg";
    var imageHTML = "<img src=\"" + imageSrc + "\">";
    document.getElementById("imageProvider").innerHTML = imageHTML;
 
        
    // Click to open cancel request button
    $(".cancelBtn").click(function(){
        $('#reasonModal').modal('show');	
    });

    // Validate cancel form
    $("#reasonForm").form({
        inline: true,
        on: "submit",
        transition: "slide down",

        // Submit cancel form - add cancel reason to database
        onSuccess: function(event, fields) {
            event.preventDefault();
            // Add cancel reason to database

            // Click to cancel request button
            $('#reasonModal').modal('hide');
            $('.cancelled-redirect').modal('show');

            // Click to return to dashboard button. Reset request
            $("#returnDashboard").click(function(){
                $('#returnDashboard').modal('hide');
                Meteor.call('resetStatus', Meteor.userId());
            });

            
        },
        fields: {
            reason: {
                identifier: "reason",
                rules: [
                    {
                        type: "empty",
                        prompt: "Please write a reason for canceling."
                    },{
                        type: "maxLength[350]",
                        prompt: "Please enter at most 350 characters."
                    },{
                        type: "minLength[10]",
                        prompt: "Please enter at least 10 characters."
                    }
                ]
            }
        }
    });
    
    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());
	
	var providerId = Requests.findOne().providerId;
	Meteor.subscribe("currProvider", providerId);
    
    $("#confirmCancelBtn").click(function(event){
		var id = Requests.findOne()._id;
		var reason = $("#reason").innerHTML;
		Meteor.call('cancelRequest', id, reason, true);
	});
    
    // Multi-select dropdown functionality
    $('#multi-select')
      .dropdown()
    ; 
});