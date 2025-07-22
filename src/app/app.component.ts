import { Component, signal } from '@angular/core';
import { HomePageComponent } from './pages/home/home-page.component';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PageConfig } from './models/page-config.model';
import { HttpClient } from '@angular/common/http';
import { PageService } from './services/page.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  imports: [HomePageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
})
export class AppComponent {
  protected readonly title = signal('test-task');

  allPagesConfig: PageConfig[] = [];
  currentPageConfig: PageConfig | null = null;

  constructor(private pageService: PageService) {
    this.pageService.getPageConfig().subscribe((config) => {
      if (config) {
        this.allPagesConfig = config;
      } else {
        console.error('Не удалось загрузить конфигурацию страницы');
      }
    });
  }

  changePage(page: number) {
    this.currentPageConfig = this.allPagesConfig[page];
  }
}
