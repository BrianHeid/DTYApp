/*
  Event for when the createProfileForm is submitted. 
  Will call the setName, setPhone, setBirthday, and setAddress functions
  to add to the Meteor.users database. 

  */

Template.editProfileForm.onRendered(function(){

    $('.ui.dropdown').dropdown();

    // Input mask for phone number for the format (XXX) XXX-XXXX
    $("#phoneNumber").inputmask({"mask": "(999) 999-9999"});

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
    getFirstName: function(){
        return {
          name: "firstName",
          type: 'text',
          value: Session.get('firstname')
        }
    },

    getLastName: function(){
        return {
          name: "lastName",
          type: 'text',
          value: Session.get('lastname')
        }
    },

    getPhoneNumber: function(){
        return {
          name: "phoneNumber",
          type: 'text',
          value: Session.get('phonenumber')
        }
    },

    getBirthday: function(){
        return {
          name: "birthday",
          min: "1887-01-01",
          max: "1999-04-01",
          type: 'date',
          value: Session.get('birthday')
        }
    }
});