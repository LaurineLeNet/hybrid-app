import '@uirouter/angularjs'; // Charge ui-router legacy
// 1. On charge la partie Legacy
import './app-js/app.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { UIRouter } from '@uirouter/core';
import { NgZone } from '@angular/core';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((platformRef) => {
    const urlService = platformRef.injector.get(UIRouter).urlService;

    // 3. On synchronise le routeur
    platformRef.injector.get(NgZone).run(() => {
      urlService.listen();
      urlService.sync();
    });
  })
  .catch((err) => console.error(err));
