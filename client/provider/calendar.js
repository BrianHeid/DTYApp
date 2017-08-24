import { Tracker } from 'meteor/tracker'
import '../../lib/collections.js'

let isPast = ( date ) => {
	let today = moment().format();
	return moment( today ).isAfter( date );
};

let closeModal = () => {
	$( '#add-edit-event-modal' ).modal( 'hide' );
	$( '.modal-backdrop' ).fadeOut();
};


Template.calendarEvents.onCreated(
	() => {
		let instance = Template.instance()
		instance.subscribe('events')
		}
	);

/*Template.addEditEventModal.onRendered(
	()=>{
		this.$('#add-edit-event-modal').modal()
	}
	)*/

Template.calendarEvents.onRendered(
	function(){
	//	$('#add-edit-event-modal').modal('hide')
		console.log("Calender rendered");
		$( '#events-calendar' ).fullCalendar({
			googleCalendarApiKey: 'AIzaSyCvGNZnDV_N8leQbOrhNLkKjbEZlrMlZ4Q',
        	events: {
            	googleCalendarId: 'apod7e1ing2q65gqen6bas2a94@group.calendar.google.com'
        	},

        	header: {
	            left: 'prev,next today',
	            center: 'title',
	            right: 'month,agendaWeek,agendaDay'
        	},

			eventClick: function(calEvent, jsEvent, view) {
        		event.preventDefault();
        		$('#event-info').modal('show');

        		console.log(calEvent.title);
        		console.log(calEvent.id);

		        document.getElementById("eventDate").innerHTML = moment(calEvent.start).format('MM/DD/YYYY');
		        document.getElementById("eventStart").innerHTML = moment(calEvent.start).format('h:mm a');
		        document.getElementById("eventEnd").innerHTML = moment(calEvent.end).format('h:mm a');
		        document.getElementById("eventTitle").innerHTML = calEvent.title;
		    }

		});
	});


Template.addEditEventModal.helpers({
	modalType( type ) {
		let eventModal = Session.get( 'eventModal' );
		if ( eventModal ) {
			return eventModal.type === type;
		}
	},
	modalLabel() {
		let eventModal = Session.get( 'eventModal' );

		if ( eventModal ) {
			return {
				button: eventModal.type === 'edit' ? 'Edit' : 'Add',
				label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
			};
		}
	},
	selected( v1, v2 ) {
		return v1 === v2;
	},
	event() {
		let eventModal = Session.get( 'eventModal' );

		if ( eventModal ) {
			return eventModal.type === 'edit' ? Events.findOne( eventModal.event ) : {
				start: eventModal.date,
				end: eventModal.date
			};
		}
	}
});


Template.addEditEventModal.events({
	'submit form' ( event, template ) {
		event.preventDefault();

		let eventModal = Session.get( 'eventModal' ),
		submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
		eventItem  = {
			title: template.find( '[name="title"]' ).value,
			start: template.find( '[name="start"]' ).value,
			end: template.find( '[name="end"]' ).value,
			type: template.find( '[name="type"] option:selected' ).value,
			guests: parseInt( template.find( '[name="guests"]' ).value, 10 )
		};

		if ( submitType === 'editEvent' ) {
			eventItem._id   = eventModal.event;
		}

		Meteor.call( submitType, eventItem, ( error ) => {
			if ( error ) {
				Bert.alert( error.reason, 'danger' );
			} else {
				Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
				closeModal();
			}
		});
	},

	'click .delete-event' ( event, template ) {
		let eventModal = Session.get( 'eventModal' );
		if ( confirm( 'Are you sure? This is permanent.' ) ) {
			Meteor.call( 'removeEvent', eventModal.event, ( error ) => {
				if ( error ) {
					Bert.alert( error.reason, 'danger' );
				} else {
					Bert.alert( 'Event deleted!', 'success' );
					closeModal();
				}
			});
		}
	}
});



