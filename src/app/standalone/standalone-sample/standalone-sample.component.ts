import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRouterModule } from '@uirouter/angular';

@Component({
  selector: 'app-standalone-sample',
  standalone: true,
  imports: [CommonModule, UIRouterModule],
  templateUrl: './standalone-sample.component.html',
  styleUrls: ['./standalone-sample.component.scss'],
})
export class StandaloneSampleComponent {}
