
import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {getSingleSpaExtraProviders, singleSpaAngular } from 'single-spa-angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import {UIRouter} from "@uirouter/core";

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    return platformBrowserDynamic(getSingleSpaExtraProviders())
      .bootstrapModule(AppModule)
      .then(moduleRef => {
          // --- LOGIQUE DE SYNCHRO ---
          // On récupère cette partie de votre ancien main.ts
          // C'est vital pour que AngularJS et Angular se parlent lors du changement d'URL
          const urlService = moduleRef.injector.get(UIRouter).urlService;
          const ngZone = moduleRef.injector.get(NgZone);

          ngZone.run(() => {
            urlService.listen();
            urlService.sync();
          });

          return moduleRef;});
  },
  template: '<app-root />',
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
