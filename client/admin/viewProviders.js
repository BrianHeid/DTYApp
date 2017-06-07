var provider;
var baseProfile;

Template.viewProviders.onRendered(function(){
    // Dropdown functionality
    $('.ui.dropdown').dropdown();

    // Dims the profile picture when hovered
    $('#propic').dimmer({
        on: 'hover'
    });
    
    var valid = false; // Check for valid address and show error message
    
   // Input mask for phone number for the format (XXX) XXX-XXXX
	$("#phonenumber").inputmask({"mask": "(999) 999-9999"});
    
    // Input mask for medical license number for the format X-99999
	$("#licenseNum").inputmask({"mask": "a99999"});
    
    // Input mask for npi number for the format 9999999999
	$("#npiNum").inputmask({"mask": "9999999999"});
    
    $("#providerProfileForm").form({
        inline: true,
		on: 'blur',
		transition: 'slide down',
		keyboardShortcuts: true,
        
        onSuccess: function(event,fields){
			event.preventDefault();
            
            var streetTrim = fields.street.trim();
			var aptNumSuiteTrim = fields.aptNumSuite.trim();
			var cityTrim = fields.city.trim();
			var stateTrim = fields.state.trim();
			var zipTrim = fields.zipcode.trim();

			CheckValidAddress(streetTrim, cityTrim, stateTrim, zipTrim, fields.country);
            
            setTimeout(function(){
				if (valid) {
					var emailTrim = fields.email.trim();
					var emailValid = Meteor.call('checkValidEmail', emailTrim);
                    
                    console.log(emailValid);

					if (emailValid == undefined) {
						Accounts.createUser({
							email: emailTrim,
							password: fields.password,
							createdAt: new Date().toLocaleString()
						});

						var fullAddress = streetTrim + ' ' + aptNumSuiteTrim + ' ' + cityTrim + ' ' + 
										  stateTrim + ' ' + zipTrim + ' ' + fields.country;

						var firstTrim = fields.firstname.trim();
						var lastTrim = fields.lastname.trim();
						var phoneStrip = fields.phonenumber.replace('(', "").replace(')', "").replace(' ', '').replace('-', '');
						var phoneNum = parseInt(phoneStrip);

						Meteor.call('addProfile', emailTrim, firstTrim, lastTrim, phoneNum, fullAddress, fields.birthday, fields.gender);
                        if (fields.isDoctor == "on") {
                            Meteor.call('addProvider', emailTrim, true, fields.licenseNum, fields.npiNum, fields.validStatesMulti, fields.specialties);
                        } else {
                            Meteor.call('addProvider', emailTrim, false, fields.licenseNum, fields.npiNum, fields.validStatesMulti, fields.specialties);
                        }
						
						console.log('Account created.....');
						console.log(fields);

						$("#successMsg").show(500);
						$("#successMsg").delay(1000).fadeOut(500);

						setTimeout(function(){FlowRouter.go('/admin');}, 2000);
					} else {
						document.getElementById("errorList").innerHTML = "<li>Email already exists!</li>";
						$("#errorMsg").show();
					}
				}

			}, 500);
            
        },
       
        ////////////////////////////// FORM VALIDATION /////////////////////////////////
		fields: {
            email: {
				identifier : 'email',
				rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter an e-mail'
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
                        prompt: 'Please create a password'
                    },
					{
						type: 'minLength[6]',
						prompt: 'Your password must be at least 6 characters'
					}
				]
			},
			firstname: {
				identifier : 'firstname',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a first name.'
				},
				{
					type: 'regExp[/^[a-zA-Z]{2,20}$/]',
					prompt: 'Please enter a valid name.'
				}
				]
			},
			lastname: {
				identifier: 'lastname',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a last name.'
				},
				{
					type: 'regExp[/^[a-zA-Z]{2,20}$/]',
					prompt: 'Please enter a valid name.'
				}
				]
			},
			phonenumber: {
				identifier: 'phonenumber',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a primary phone number.'
				},
				{
					type: 'regExp[/^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$/]',
					prompt: 'Please enter a valid phone number.'
				}
				]
			},
			birthday: {
				identifier: 'birthday',
				rules: [
				{
					type: 'empty',
					prompt: 'Please enter a birthday.'
				}
				]
			},
			gender: {
				identifier: 'gender',
				rules: [
				{
					type: 'empty',
					prompt: 'Please specify a gender.'
				}
				]
			},
			street:{
                identifier: 'street',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please enter a street address.'
                }
                ]
            },
            city:{
                identifier: 'city',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please enter a city.'
                }
                ]
            },
            state:{
                identifier: 'state',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please enter a state.'
                }
                ]
            },
            country:{
            	identifier: 'country',
            	rules:[
            	{
            		type: 'empty',
            		prompt: 'Please select a country.'
            	}
            	]
            },
            zipcode:{
                identifier: 'zipcode',
                rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter a zip code.'
                }
                ]
            },
			licenseNum: {
				identifier : 'licenseNum',
				rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter a medical license number'
                    }
                    //,{
                    //    type: 'regExp[/^[a-zA-Z]\d{5}$/]',
                    //    prompt: 'Please enter a valid medical license number'
                    //}
				]
			},
			npiNum: {
				identifier : 'npiNum',
				rules: [
					{
                        type: 'empty',
                        prompt: 'Please enter an NPI number'
                    }
//                    ,{
//						type: 'regExp[/^\d{10}$/]',
//						prompt: 'The NPI number must be 10 digits'
//					}
				]
			},
            validStatesMulti: {
                identifier: 'validStatesMulti',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please select at least one region'
                    }
                ]
            },
            specialties: {
                identifier: 'specialties',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please select at least one specialty'
                    }
                ]
            },
            notifications: {
                identifier: 'notifications',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please select a notification prference'
                    }
                ]
            }
		}
        
    });
    
    
    function CheckValidAddress(street,city,state,zip,country) {
        var streetAdd = street.trim();
        var cityAdd = city.trim();
        var stateAdd = state;
        var zipAdd = zip;
        var countryAdd = country;
    
        // Merges the address into one string to query the Geocoder
        var address = streetAdd + " " + cityAdd + " " + stateAdd + " " + zipAdd + " " + countryAdd;
    
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            switch (status) {
                case google.maps.GeocoderStatus.OK:
                    $("#errorMsg").hide();
                    valid = true;
                    break;
                case google.maps.GeocoderStatus.ZERO_RESULTS:
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    $("#aptNumSuite").val('');
    
                    document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
                    $("#errorMsg").show();
                    valid = false;
                    break;
                case google.maps.GeocoderStatus.ERROR:
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    $("#aptNumSuite").val('');
    
                    document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
                    $("#errorMsg").show();
                    valid = false;
                    break;
                case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                    $("#street").val('')
                    $('#city').val('')
                    $('#state').val('')
                    $('#zipcode').val('');
                    $("#aptNumSuite").val('');
    
                    document.getElementById("errorList").innerHTML = "<li>Address is invalid!</li>";
                    $("#errorMsg").show();
                    valid = false;
                    break;
            }
        });
    }

});

Template.viewProviders.events({
    'click #searchEmailButton': function( ){
        var emailAddress = document.getElementById("searchProviderEmail");
        console.log(emailAddress.value);
        provider = Providers.findOne({email:emailAddress.value});
        baseProfile = Profiles.findOne({email:emailAddress.value});
        DisplayProvider();
        emailAddress.value = "";
    },

    'click #searchNameButton': function( ){
        var firstName = document.getElementById("searchProviderFirstName");
        var lastName = document.getElementById("searchProviderLastName");
        console.log(firstName.value + lastName.value);
        baseProfile = Profiles.findOne({firstname:firstName.value, lastname:lastName.value});
        provider = Providers.findOne({email:baseProfile.email});
        DisplayProvider()
        firstName.value = "";
        lastName.value = "";
    }
});

function DisplayProvider(){
    var providerHTML;
    var providerDiv = document.getElementById("providerResults");
    var regions = "";
    var specialties = "";


    if (provider){

        for(i = 0; i < provider.regions.length; i++){
            regions += " " + provider.regions[i];
        }

        for(i = 0; i < provider.specialties.length; i++){
            specialties += " " + provider.specialties[i];
        }


        providerHTML = "<h1>Patient Info</h1>";
        providerHTML += "<table>";
        providerHTML += "<tr><td>Name: </td><td>" + baseProfile.firstname + " " + baseProfile.lastname + "</td></tr>";
        providerHTML += "<tr><td>Email Address: </td><td>" + baseProfile.email + "</td></tr>";
        providerHTML += "<tr><td>Phone Number: </td><td>" + baseProfile.phone + "</td></tr>";
        providerHTML += "<tr><td>Address: </td><td>" + baseProfile.address + "</td></tr>";
        providerHTML += "<tr><td>Gender: </td><td>" + baseProfile.gender + "</td></tr>";
        providerHTML += "<tr><td>Account Creation: </td><td>" + baseProfile.createdAt + "</td></tr>";
        providerHTML += "<tr><td>Is Doctor: </td><td>" + provider.isDoctor + "</td></tr>";
        providerHTML += "<tr><td>License Number: </td><td>" + provider.licenseNum + "</td></tr>";
        providerHTML += "<tr><td>NPI Number: </td><td>" + provider.npiNum + "</td></tr>";
        providerHTML += "<tr><td>Regions: </td><td>" + regions + "</td></tr>";
        providerHTML += "<tr><td>specialties: </td><td>" + specialties + "</td></tr>";
        providerHTML += "</table><br>";
        providerHTML += "<button class=\"ui primary button\" id=\"editButton\"> Edit </button>";
    }
    else{
        providerHTML = "<h1>Provider Not Found</h1>";
    } 
    
    providerDiv.innerHTML = providerHTML;
};
