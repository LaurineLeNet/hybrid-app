import '@uirouter/angularjs';
import './app-js/app.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { UIRouter } from '@uirouter/core';
import { NgZone } from '@angular/core';


// Si on veut lancer en standalone
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((platformRef) => {
    const urlService = platformRef.injector.get(UIRouter).urlService;
    platformRef.injector.get(NgZone).run(() => {
      urlService.listen();
      urlService.sync();
    });
  })
  .catch((err) => console.error(err));
