import { Tracker } from 'meteor/tracker'
import '../lib/collections.js'



let isPast = ( date ) => {
	let today = moment().format();
	return moment( today ).isAfter( date );
};

let closeModal = () => {
	$( '#add-edit-event-modal' ).modal( 'hide' );
	$( '.modal-backdrop' ).fadeOut();
};


let EventsSchema = new SimpleSchema({
	'title': {
		type: String,
		label: 'The title of this event.'
	},
	'start': {
		type: String,
		label: 'When this event will start.'
	},
	'end': {
		type: String,
		label: 'When this event will end.'
	},
	'type': {
		type: String,
		label: 'What type of event is this?',
		allowedValues: [ 'New Requests', 'Consultation', 'Follow Up', 'Miscellaneous' ]
	},
	'guests': {
		type: Number,
		label: 'The number of guests expected at this event.'
	}
});

Events.attachSchema( EventsSchema );


Template.calendarEvents.onCreated(
	() => {
		let instance = Template.instance()
		instance.subscribe('events')
		}
	);

Template.addEditEventModal.onRendered(
	()=>{
		this.$('#add-edit-event-modal').modal()
	}
	)


Template.calendarEvents.onRendered(
	function(){
		$('#add-edit-event-modal').modal('hide')
		$( '#events-calendar' ).fullCalendar({
			events( start, end, timezone, callback ) {
				let data = Events.find().fetch().map( ( event ) => {
					event.editable = !isPast( event.start );
					return event;
				});

				if ( data ) {
					callback( data );
				}
			},
			eventRender( event, element ) {
				element.find( '.fc-content' ).html(
					`<h4>${ event.title }</h4>
					<p class="guest-count">${ event.guests } Guests</p>
					<p class="type-${ event.type }">#${ event.type }</p>
					`
					);
			},

			dayClick( date ) {
				Session.set( 'eventModal', { type: 'add', date: date.format() } );
				$( '#add-edit-event-modal' ).modal( 'show' );
			},
			eventClick( event ) {
				Session.set( 'eventModal', { type: 'edit', event: event._id } );
				$( '#add-edit-event-modal' ).modal( 'show' );
			},

			eventDrop( event, delta, revert ) {
				let date = event.start.format();
				if ( !isPast( date ) ) {
					let update = {
						_id: event._id,
						start: date,
						end: date
					};

					Meteor.call( 'editEvent', update, ( error ) => {
						if ( error ) {
							Bert.alert( error.reason, 'danger' );
						}
					});
				} else {
					revert();
					Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
				}
			}
		});
		
		Tracker.autorun( () => {
			Events.find().fetch();
			$( '#events-calendar' ).fullCalendar( 'refetchEvents' );
		});
		

	})


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



