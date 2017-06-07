var patient;

	Template.adminPatients.events({
		'click #searchEmailButton': function( ){
			var emailAddress = document.getElementById("searchEmail");
			console.log(emailAddress.value);
			patient = Profiles.findOne({email:emailAddress.value});
			DisplayPatient();
			emailAddress.value = "";
		},

		'click #searchNameButton': function( ){
			var firstName = document.getElementById("searchFirstName");
			var lastName = document.getElementById("searchLastName");
			console.log(firstName.value + lastName.value);
			patient = Profiles.findOne({firstname:firstName.value, lastname:lastName.value});
			DisplayPatient()
			firstName.value = "";
			lastName.value = "";
		},

		'click #editButton' : function( ){
			$('#editPatientModal').modal('show');
		},

		'click #confirmEditButton' : function( ){

			event.preventDefault();

			if (fields.new_email) {
				var emailTrim = fields.new_email.trim();

				var ret = PatientEmails.findOne({'email':emailTrim});

				if (ret == undefined) {
					Accounts.update(
						{_id:patient._id},
						{email:emailTrim}
					);

					Meteor.call('addPatientEmail', emailTrim);
				}
				else {
					document.getElementById("errorList").innerHTML = "<li>Email already exists!</li>";
					$("#errorMsg").show();
				}
			}

			if(fields.street || fields.city || fields.state || fields.zipcode){
				if(fields.street && fields.city && fields.state && fields.zipcode){
					var streetTrim = fields.street.trim();
					var aptNumSuiteTrim = fields.aptNumSuite.trim();
					var cityTrim = fields.city.trim();
					var stateTrim = fields.state.trim();
					var zipTrim = fields.zipcode.trim();

					CheckValidAddress(streetTrim, cityTrim, stateTrim, zipTrim, fields.country);

					if(valid){
						var fullAddress = streetTrim + ' ' + aptNumSuiteTrim + ' ' + cityTrim + ' ' + 
									  stateTrim + ' ' + zipTrim + ' ' + fields.country;
						Accounts.update(
							{_id:patient._id},
							{address:fullAddress}
						);
					}
					else{
						document.getElementById("errorList").innerHTML = "<li>Invalid Address</li>";
						$("#errorMsg").show();
					}
				}
				else{
					document.getElementById("errorList").innerHTML = "<li>Invalid Address</li>";
					$("#errorMsg").show();
				}
			}

			console.log(fields.firstname);
			if(fields.firstname){
				console.log("Trying to change first name");
				var firstTrim = fields.firstname.trim();
				Accounts.update(
					{_id:patient._id},
					{firstname:firstTrim}
					);
			}

			if(fields.lastname){
				var lastTrim = fields.lastname.trim();
				Accounts.update(
					{_id:patient._id},
					{lastname:lastTrim}
				);
			}

			if(fields.phone){
				var phoneStrip = fields.phonenumber.replace('(', "").replace(')', "").replace(' ', '').replace('-', '');
				var phoneNum = parseInt(phoneStrip);
				Accounts.update(
					{_id:patient._id},
					{phone:phoneNum}
				);
			}
					
			console.log("Patient edited");

					// TEMPORARY TEMPORARY TEMPORARY
		            // Allows user to make themselves an administrator
            
            console.log('Got here')
            console.log(fields.adminMaker)
            if(fields.adminMaker){
            	if(!Admin.findOne({email:patient.email})){
            		Admins.insert({email:patient.email});
            	}
            }

		            //TEMPORARY TEMPORARY

			$("#editPatientModal").modal('hide')

			//FlowRouter.go('/admin');
		}
	});

/*$('#editForm').form({
	inline: true,
	on: 'blur',
	transition: 'slide down',
	keyboardShortcuts: true,

	onSuccess: function(event,fields){
		event.preventDefault(); 

		var errors;

			if (fields.new_email) {
				var emailTrim = fields.new_email.trim();

				var ret = PatientEmails.findOne({'email':emailTrim});

				if (ret == undefined) {
					Accounts.update(
						{_id:patient._id},
						{email:emailTrim}
					);

					Meteor.call('addPatientEmail', emailTrim);
				}
				else {
					document.getElementById("errorList").innerHTML = "<li>Email already exists!</li>";
					$("#errorMsg").show();
				}
			}

			if(fields.street || fields.city || fields.state || fields.zipcode){
				if(fields.street && fields.city && fields.state && fields.zipcode){
					var streetTrim = fields.street.trim();
					var aptNumSuiteTrim = fields.aptNumSuite.trim();
					var cityTrim = fields.city.trim();
					var stateTrim = fields.state.trim();
					var zipTrim = fields.zipcode.trim();

					CheckValidAddress(streetTrim, cityTrim, stateTrim, zipTrim, fields.country);

					if(valid){
						var fullAddress = streetTrim + ' ' + aptNumSuiteTrim + ' ' + cityTrim + ' ' + 
									  stateTrim + ' ' + zipTrim + ' ' + fields.country;
						Accounts.update(
							{_id:patient._id},
							{address:fullAddress}
						);
					}
					else{
						document.getElementById("errorList").innerHTML = "<li>Invalid Address</li>";
						$("#errorMsg").show();
					}
				}
				else{
					document.getElementById("errorList").innerHTML = "<li>Invalid Address</li>";
					$("#errorMsg").show();
				}
			}


			if(fields.firstname){
				console.log("Trying to change first name");
				var firstTrim = fields.firstname.trim();
				Accounts.update(
					{_id:patient._id},
					{firstname:firstTrim}
					);
			}

			if(fields.lastname){
				var lastTrim = fields.lastname.trim();
				Accounts.update(
					{_id:patient._id},
					{lastname:lastTrim}
				);
			}

			if(fields.phone){
				var phoneStrip = fields.phonenumber.replace('(', "").replace(')', "").replace(' ', '').replace('-', '');
				var phoneNum = parseInt(phoneStrip);
				Accounts.update(
					{_id:patient._id},
					{phone:phoneNum}
				);
			}
					
			console.log("Patient edited");

					// TEMPORARY TEMPORARY TEMPORARY
		            // Allows user to make themselves an administrator
            
            console.log('Got here')
            console.log(fields.adminMaker)
            if(fields.adminMaker){
            	if(!Admin.findOne({email:patient.email})){
            		Admins.insert({email:patient.email});
            	}
            }

		            //TEMPORARY TEMPORARY

			$("#editPatientModal").modal('hide')
		
	},

	////////////////////////////// FORM VALIDATION /////////////////////////////////
	fields: {
		firstname: {
			identifier : 'firstname',
			rules: [
			{
				type: 'empty',
				prompt: 'Please enter a first name.'
			},
			{
				type: 'regExp[/^[a-zA-Z]{3,20}$/]',
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
				prompt: 'Please enter your primary phone number.'
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
				prompt: 'Please enter your birthday.'
			}
			]
		},
		gender: {
			identifier: 'gender',
			rules: [
			{
				type: 'empty',
				prompt: 'Please specify your gender.'
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
		new_email: {
			identifier : 'new_email',
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
		new_password: {
			identifier : 'new_password',
			rules: [
				{
					type: 'minLength[6]',
					prompt: 'Your password must be at least 6 characters'
				}
			]
		},
		password_confirm: {
			identifier: 'password_confirm',
			rules: [
				{
					type: 'match[new_password]',
					prompt: 'Password does not match.'
				}
			]
		},
		acquisition: {
			identifier: 'acquisition',
			rules: [
				{
					type: 'empty',
					prompt: 'Please select one.'
				}
			]
		}
	}
}); */

	Template.adminPatients.helpers({
		'patientFirstName' : function(){
			var name = patient.firstname;
			console.log("patientFirstName");
			console.log(patient.firstname);
			console.log(name);
			return name;
		},
		'patientLastName' : function(){
			return patient.lastName;
		},
		'patientEmail' : function(){
			return patient.email;
		},
		'patientPhone' : function(){
			return patient.phone;
		},
		'patientAddress' : function(){
			return patient.address;
		},
		'patientGender' : function(){
			return patient.gender;
		},
		'patientCreation' : function(){
			return patient.createdAt;
		}
	}); 

function DisplayPatient(){
	var patientHTML;
	var patientDiv = document.getElementById("patientResults");

	if (patient){
		patientHTML = "<h1>Patient Info</h1>";
		patientHTML += "<table>";
		patientHTML += "<tr><td>Name: </td><td>" + patient.firstname + " " + patient.lastname + "</td></tr>";
		patientHTML += "<tr><td>Email Address: </td><td>" + patient.email + "</td></tr>";
		patientHTML += "<tr><td>Phone Number: </td><td>" + patient.phone + "</td></tr>";
		patientHTML += "<tr><td>Address: </td><td>" + patient.address + "</td></tr>";
		patientHTML += "<tr><td>Gender: </td><td>" + patient.gender + "</td></tr>";
		patientHTML += "<tr><td>Account Creation: </td><td>" + patient.createdAt + "</td></tr>";
		patientHTML += "</table><br>";
		patientHTML += "<button class=\"ui primary button\" id=\"editButton\"> Edit </button>";
	}
	else{
		patientHTML = "<h1>Patient Not Found</h1>";
	} 
	
	patientDiv.innerHTML = patientHTML;
};
