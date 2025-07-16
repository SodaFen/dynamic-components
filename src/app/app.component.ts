import { Component, signal } from '@angular/core';
import { HomePageComponent } from './pages/home/home-page.component';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  imports: [HomePageComponent],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent {
  protected readonly title = signal('test-task');
}
