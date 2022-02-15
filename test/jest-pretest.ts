import 'aurelia-polyfills';
import {Options} from 'aurelia-loader-nodejs';
import {globalize} from 'aurelia-pal-nodejs';
import * as path from 'path';
Options.relativeToDir = path.join(__dirname, 'unit');
import "@fullcalendar/core";

function fail(reason = "fail was called in a test.") {
  throw new Error(reason);
}

(global as any).fail = fail;

globalize();
