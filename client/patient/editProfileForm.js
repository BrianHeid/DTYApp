/*
  Event for when the createProfileForm is submitted. 
  Will call the setName, setPhone, setBirthday, and setAddress functions
  to add to the Meteor.users database. 
  */
/*
Template.editProfileForm.events({
	'submit form': function(){
        event.preventDefault();
        var firstName = event.target.firstName.value;
        var lastName = event.target.lastName.value;
        Meteor.call('setName', firstName, lastName);

        var phoneNumber = event.target.phoneNumber.value;
        Meteor.call('setPhone', phoneNumber);

        var birthday = event.target.birthday.value;
        Meteor.call('setBirthday', birthday);

        var street = event.target.street.value;
        var city = event.target.city.value;
        var state = event.target.state.value;
        var country = event.target.country.value;
        var zipcode = event.target.zipcode.value;
        var aptNumSuite = event.target.aptNumSuite.value;
        Meteor.call('setAddress', street, city, state, country, zipcode, aptNumSuite);

    }
});
*/

/*
Template.editProfileForm.onRendered(

    this.$('.ui.form').form({
        onSuccess: function(event,fields){
            console.log(fields)
        },
        fields: {
            phoneNumber:{
                identifier: 'phoneNumber',
                rules:[
                {
                    type: 'regex[/^[0-9]{10,11}$/]',
                    prompt: 'Please enter a valid phone number without special characters.'
                },
                {
                    type: 'empty',
                    prompt: 'Please provide a phone number.'
                }
                ]
            },
            birthday:{
                identifier: 'birthday',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please enter your date of birth.'
                }
                ]
            },
            street:{
                identifier: 'street',
                rules:[
                {
                    type: 'regex[/^[A-Za-z0-9 ]$/]',
                    prompt: 'Please enter a valid street address.'
                },
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
                    type: 'regex[/^[A-Za-z0-9 ]$/]',
                    prompt: 'Please enter a valid city.'
                },
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
                    type: 'regex[/^[A-Za-z0-9 ]$/]',
                    prompt: 'Please enter a valid state.'
                },
                {
                    type: 'empty',
                    prompt: 'Please enter a state.'
                }
                ]
            },
            zipcode:{
                identifier: 'zipcode',
                rules: [
                {
                    type: 'regex[/^[0-9 ]{5}$/]',
                    prompt: 'Please enter a valid zip code.'
                },
                {
                    type: 'empty',
                    prompt: 'Please enter a zip code.'
                }
                ]
            }
            
        }
    })
    )
*/

Template.editProfileForm.onRendered(function(){

    this.$('#firstName').val('Fix')


    this.$('.ui.form').form({
        inline: true,
        on: 'blur',
        transition: 'slide down',
        onSuccess: function(event, fields){
            event.preventDefault()
            var address = {
                'street': fields['street'],
                'city': fields['city'],
                'state': fields['country'],
                'zip': fields['zipcode']
            }

            var phoneNumber = fields['phoneNumber']

            var birthday = fields['birthday']
            Meteor.call('updateProfile', Meteor.user(), address, phoneNumber, birthday)
        },
        fields: {
            phoneNumber:{
                identifier: 'phoneNumber',
                rules:[
                {
                    type: 'regExp[/^[0-9]{10,11}$/]',
                    prompt: 'Please enter a valid phone number without special characters.'
                },
                {
                    type: 'empty',
                    prompt: 'Please provide a phone number.'
                }
                ]
            },
            birthday:{
                identifier: 'birthday',
                rules:[
                {
                    type: 'empty',
                    prompt: 'Please enter your date of birth.'
                }
                ]
            },
            street:{
                identifier: 'street',
                rules:[
                {
                    type: 'regExp[/^\\d [A-Za-z ]* (?:Rd\\.)|(?:Dr\\.)|(?:St\\.)|(?:Ct\\.)$/]',
                    prompt: 'Please enter a valid street address.'
                },
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
                    type: 'regExp[/^[A-Za-z]{0,144}$/]',
                    prompt: 'Please enter a valid city.'
                },
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
                    type: 'regExp[/^[A-Za-z]{2}$/]',
                    prompt: 'Please enter a valid state.'
                },
                {
                    type: 'empty',
                    prompt: 'Please enter a state.'
                }
                ]
            },
            zipcode:{
                identifier: 'zipcode',
                rules: [
                {
                    type: 'regExp[/^[0-9 ]{5}$/]',
                    prompt: 'Please enter a valid zip code.'
                },
                {
                    type: 'empty',
                    prompt: 'Please enter a zip code.'
                }
                ]
            }
            
        }
    })

});


Template.editProfileForm.helpers({
    'firstName':function(){
        return Meteor.user().profile['firstname']
    },
    'lastName':function(){
        return Meteor.user().profile['lastname']
    }
})