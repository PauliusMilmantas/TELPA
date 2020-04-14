"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");

//Main app module
var app_module_1 = require("./app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule).catch(err => console.log(err));

//Calendar module
// var calendar_module_1 = require("./calendar/calendar.module");



//# sourceMappingURL=main.js.map