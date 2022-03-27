import { observable } from 'aurelia-framework';
import { CalendarOptions, EventApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timeGrid";
import listPlugin from "@fullcalendar/list";
//import scrollGridPlugin from "@fullcalendar/scrollgrid";

export class App {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    //initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: false,
    selectMirror: false,
    dayMaxEvents: true,
    events: [
      {
        title: "Festival in HH",
        start: new Date(),
        end: new Date(),
        className: 'festival',
        color: 'orange',
        textColor: 'black',
        kind: 'festival',
        state: 'hh'
      },
    ],
    select: ({ start, end }) => {
      alert('')
    }
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];
}
