import { bindable, BindingEngine, containerless, inject, view } from 'aurelia-framework';
import { Calendar, CalendarOptions } from "@fullcalendar/core";

/**
 * FullCalendar: class for the view-model for the full-calendar aurelia component.
 * bindables:
 *  - options: CalendarOptions 
 *  - id: string optional id for the DOM element for the calendar object.
 *  
 */
@view(`<template><div ref="calEl"></div></template>`)
@inject(BindingEngine)
export class FullCalendar {
  private calEl: HTMLElement;
  private calendar: Calendar;
  @bindable id: string;
  @bindable options: CalendarOptions;
  @bindable deepChangeDetection: boolean;
  //private optionSnapshot: object = {}; // for diffing only

  public subscriptions: Array<any> = [];

  constructor(
    private bindingEngine: BindingEngine,
  ) {

  }

  /**
   * optionChangeHandler callback method invoked when a property of the options property changes.
   * @param propName 
   * @param newValue 
   * @param oldValue 
   */
  optionChangeHandler(propName, newValue, oldValue) {
    console.debug(propName, 'changed to:', newValue, 'from:', oldValue);
    const hardProps = ['selectable'];
    if (hardProps.includes(propName)) {
      setTimeout(() => this.optionsChanged(this.options), 10);
    }
    else
      this.calendar.setOption(propName, newValue);
  }

  /**
   * bind event callback called after bindable properties are bound.
   * 1. creates the calendar instance
   * 2. suscribes observers for each options object property.
   */
  bind() {
    if (this.options) {
      this.calendar = new Calendar(this.calEl, this.options);
      for (const propName in this.options) {
        this.subscriptions.push(
          this.bindingEngine
            .propertyObserver(this.options, propName)
            .subscribe((newValue, oldValue) => {
              this.optionChangeHandler({}, propName, newValue, oldValue)
            }));
      }
    }
    if (this.id) {
      this.calEl.id = this.id;
    }
  }

  /**
   * idChanged: callback method invoked when the id property value is changed.
   * this value is assigned to the id attribute of the DOM element of the calendar (referenced by calEl property).
   * @param newValue: the new value of the id property.
   */
  idChanged(newValue: string) {
    if (newValue)
      this.calEl.id = newValue;
    else
      this.calEl.removeAttribute('id');
  }

  /**
   * optionsChanged: callback method invoked when the calendarOptions property value is changed.
   * It pauses rendering, replaces the options of the calendar instance and then resumes rendering.
   * @param newValue: the new value of the calendarOptions property.
   */
  optionsChanged(newValue: CalendarOptions) {
    if (this.calendar) {
      this.calendar.pauseRendering();
      this.calendar.resetOptions(this.options);
      this.calendar.resumeRendering();
    }
  }

  /**
   * attached event callback.
   * The render() method must be called here and not in bind(), because the DOM must be built for render() to work.
   */
  attached() {
    if (this.calendar) {
      this.calendar.render();
    }
  }

  /**
   * unbind event callback used to release all resources that should be freed before view is gone.
   */
  unbind() {
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = null;
    }
    this.subscriptions.forEach(subscriber => {
      if (subscriber && subscriber.dispose) {
        subscriber.dispose()
      }
    });
    this.subscriptions.splice(0, this.subscriptions.length);
  }

  getApi(): Calendar {
    return this.calendar;
  }
}