import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';

export function configure(config: FrameworkConfiguration): void {
  config.globalResources([
    PLATFORM.moduleName('./attributes/color'),
    PLATFORM.moduleName('./value-converters/upcase'),
    PLATFORM.moduleName('./binding-behaviors/primary-click'),
    PLATFORM.moduleName('./elements/hello-world'),
    PLATFORM.moduleName('./elements/full-calendar'),
  ]);
}

export {
  CalendarOptions, DateSelectArg, EventClickArg, EventApi,
};