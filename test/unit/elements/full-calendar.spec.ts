import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";

describe('full-calendar element', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('initialize with default options', done => {
    let calendarOptions: CalendarOptions = {
      plugins: [ dayGridPlugin ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
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
    };

    let model = {
      calendarOptions,
    };

    component = StageComponent
      .withResources('elements/full-calendar')
      .inView('<full-calendar options.bind="calendarOptions"></full-calendar>')
      .boundTo(model);

    component.create(bootstrap).then(() => {
      const view = component.element;
      const element = document.querySelector('full-calendar');
      expect(element.classList.contains('au-target')).toBe(true);
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
