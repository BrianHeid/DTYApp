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


Template.adminCalendar.onCreated(
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

Template.adminCalendar.onRendered(
	function(){
	//	$('#add-edit-event-modal').modal('hide')
		console.log("Calender rendered");
		$( '#events-calendar' ).fullCalendar({
			googleCalendarApiKey: 'AIzaSyCvGNZnDV_N8leQbOrhNLkKjbEZlrMlZ4Q',
        	events: {
            	googleCalendarId: 'apod7e1ing2q65gqen6bas2a94@group.calendar.google.com'
            	// add more calendars for more shifts in future
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
