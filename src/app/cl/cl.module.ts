import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { ModuleSampleComponent } from './module-sample/module-sample.component';

const uiStates = [
  {
    name: 'module',
    url: '/module',
    component: ModuleSampleComponent,
  },
];
@NgModule({
  declarations: [ModuleSampleComponent],
  imports: [UIRouterModule.forChild({ states: uiStates })],
})
export class ClModule {}
