
Template.shiftsCalender.onRendered(
	function(){
	//	$('#add-edit-event-modal').modal('hide')
		console.log("Calender rendered");
		$( '#shifts-calendar' ).fullCalendar({
			googleCalendarApiKey: 'AIzaSyCvGNZnDV_N8leQbOrhNLkKjbEZlrMlZ4Q', // Currently connected to WordPress@doctorstoyou.com shifts calendar.
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