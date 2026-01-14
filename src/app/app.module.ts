import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClModule } from './cl/cl.module';
import { UIRouterModule } from '@uirouter/angular';
import { UIRouterUpgradeModule } from '@uirouter/angular-hybrid';
import { StandaloneSampleComponent } from './standalone/standalone-sample/standalone-sample.component';
import { AppComponent } from './app.component';
import { UpgradeModule } from '@angular/upgrade/static';
import { UIRouter } from '@uirouter/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UIRouterUpgradeModule,
    UpgradeModule,
    UIRouterModule.forChild({
      states: [
        {
          name: 'standalone',
          url: '/standalone',
          component: StandaloneSampleComponent, // On pointe direct dessus
        },
      ],
    }), // Config globale
    ClModule,
  ],
  providers: [],
})
export class AppModule implements DoBootstrap {
  constructor(
    private upgrade: UpgradeModule,
    private injector: Injector,
  ) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    // 1. On démarre D'ABORD AngularJS (crée l'injecteur $injector)
    this.upgrade.bootstrap(document.body, ['loloApp'], {
      strictDi: false,
    });

    // 2. ENSUITE on démarre le composant Angular (qui a besoin de l'injecteur)
    appRef.bootstrap(AppComponent);

    // 3. LANCER LA SYNCHRONISATION (Crucial !)
    // Cela permet à Angular et AngularJS de se parler via l'URL
    const uiRouter = this.injector.get(UIRouter);

    uiRouter.urlService.listen();
    uiRouter.urlService.sync();
  }
}
