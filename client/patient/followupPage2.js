Template.followupPage2.onRendered(function(){
    var status;

    Meteor.call('getCurrProviderName', Meteor.userId(), function(err, response){
        console.log("Reponse");
        console.log(response);
        Session.set('providerName', response);
    });

    // Click on happy face
    $("#happy").click(function(){
        $("#happy").css("opacity", "1.0");	//Full opacity for happy
        $("#straight").css("opacity", "0.5");	//Half opacity for straight
        $("#unhappy").css("opacity", "0.5");	//Half opacity for unhappy
        status = "happy";
        document.getElementById("health-status").innerHTML = "I feel all better.";
    });

    // Click on straight face
    $("#straight").click(function(){
        $("#straight").css("opacity", "1.0");	//Full opacity for straight
        $("#happy").css("opacity", "0.5");		//Half opacity for happy
        $("#unhappy").css("opacity", "0.5");	//Half opacity for unhappy
        status = "straight";
        document.getElementById("health-status").innerHTML = "I feel somewhat better.";
    });

    // Click on unhappy face
    $("#unhappy").click(function(){
        $("#unhappy").css("opacity", "1.0");	//Full opacity for unhappy
        $("#straight").css("opacity", "0.5");	//Half opacity for straight
        $("#happy").css("opacity", "0.5");		//Half opacity for happy
        status = "unhappy";
        document.getElementById("health-status").innerHTML = "I feel no improvement.";
    });

    // Click on any of the faces will reveal the submit button
    $("#happy, #straight, #unhappy").click(function(){
        $("#submit-btn").css("visibility", "visible");
    });

    // Click on submit button will trigger respective message
    $("#submit-btn").click(function(){
        event.preventDefault();	//Prevents page from refreshing

        // Disable ability to touch any faces after submitting
        $("#happy, #straight, #unhappy").off("click");
        document.getElementById("submit-btn").disabled = true;
        $('#success').show(500);	// Reveals success message for 500 milliseconds
        $("#success").delay(500).fadeOut(1000);	// Hides success message after 500 milliseconds and then another 1000 milliseconds

        // If "Somewhat better" or "No improvement" will show short message
        // Otherwise "All better" will show ratings box
        if (status == "straight" || status == "unhappy") {
            $("#followupSent").delay(2000).show(500);
        } else {
            $("#followupContent").delay(3000).fadeOut(500);
            $("#happyDiv").delay(3500).show(500);

            // Process payment using stored billing info
            Meteor.call('getClientToken', function(error, clientToken) {
              if (error) {
                console.log(error);
              }
              else {
                var client = new braintree.api.Client({clientToken: token});
                var fee = '10.00';
                client.tokenizeCard({
                  number: Profiles.findOne({email: emailAddress}).cardNumber,
                  expirationDate: '10/20'
              }, function (err, nonce) {
                // Send nonce to your server
                Meteor.call('createTransaction', nonce, fee, function(error, success) {
                  if (error) {
                    throw new Meteor.Error('transaction-creation-failed');
                  } else {
                    console.log("Payment Received")
                  }
                });
              });

                //remove the used billing info
                Meteor.call('removeBillingInfo', Meteor.user());
              }
            });

            var name = Profiles.findOne({email: emailAddress}).firstname;

            // send email
            Meteor.call('sendEmail',{
                    to: emailAddress,
                    from: 'no-reply@doctorstoyouapp.com',
                    subject: 'Doctors To You: Request sent',
                    text: '',
                    html:"Dear " + name +", <br><br>We are glad you are feeling better. Thank you so much for choosing Doctors To You. We have enjoyed treating you.<br><br>Sincerely,<br> the Doctors To You care team"
                    });

        }
    });

    // Click on submit button
    $("#submitBtn").click(function(){
        event.preventDefault();	// Prevent page from refreshing
        $('#success').show(500);	// Reveal in 500 milliseconds
        $("#feedbackContent").delay(400).fadeOut(1000);
        $("#feedbackSubmitted").delay(500).show(500);
        $('#share-content').delay(500).show(100);
        $('#happyStatus').hide();
        Meteor.call('updateStatus', Meteor.userId(), 13);
    });

    $("#click-here-btn").click(function(){
        Meteor.call('updateView', Meteor.userId(), 'Review');
    });

    // Rating functionality
    $('.rating').rating();



    var emailAddress = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
	Meteor.subscribe("currProfile", emailAddress);
	Meteor.subscribe("currRequest", Meteor.userId());

	var providerId = Requests.findOne().providerId;
	Meteor.subscribe("currProvider", providerId);
});

Template.followupPage2.helpers({
    patientName: function(){
        var patientEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
        return Profiles.findOne({email:patientEmail}).firstname;
   },
   providerName: function(){
        providerName = Session.get('providerName');

		return providerName;
   }
});
