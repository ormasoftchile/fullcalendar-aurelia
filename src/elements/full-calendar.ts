import { bindable, BindingEngine, containerless, inject, view } from 'aurelia-framework';
import { CalendarOptions, ViewApi } from "@fullcalendar/core";
import { Calendar } from '@fullcalendar/core';

/**
 * FullCalendar: class for the view-model for the full-calendar aurelia component.
 * bindables: - options
 */
@view(`<template><div ref="calEl"></div></template>`)
@inject(BindingEngine)
export class FullCalendar {
  private calEl: HTMLDivElement;
  private calendar: Calendar;
  @bindable id: string;
  @bindable options: CalendarOptions;
  @bindable deepChangeDetection: boolean;
  //private optionSnapshot: object = {}; // for diffing only

  public subscriptions: Array<any> = [];

  public myDataObj = {
    independentContractor: '',
    independentContractorNote: '',
    meetingInTheShowroom: '',
    visitTheSite: '',
  };

  constructor(
    private bindingEngine: BindingEngine,
  ) {

  }

  optionChangeHandler(metaInfo, propName, newValue, oldValue) {
    console.debug(metaInfo, propName, 'changed to:', newValue, 'from:', oldValue);
    const hardProps = ['selectable'];
    if (hardProps.includes(propName)) {
      setTimeout(() => this.optionsChanged(this.options), 10);
    }
    else
      this.calendar.setOption(propName, newValue);
  }

  /**
   * bind event callback called after bindable properties are bound.
   */
  bind() {
    if (this.options) {
      this.calendar = new Calendar(this.calEl, this.options);
      this.attachSubscriptions();
    }

    if (this.id) {
      this.calEl.id = this.id;
    }
  }

  idChanged(newValue: string) {
    if (newValue)
      this.calEl.id = newValue;
    else
      this.calEl.removeAttribute('id');
  }

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

  unbind() {
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = null;
    }
    this.releaseSubscriptions();
  }

  attachSubscriptions() {
    for (const propName in this.options) {
      this.subscriptions.push(
        this.bindingEngine
          .propertyObserver(this.options, propName)
          .subscribe((newValue, oldValue) => {
            this.optionChangeHandler({}, propName, newValue, oldValue)
          }));
    }
  }

  releaseSubscriptions() {
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