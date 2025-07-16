import { DynamicWrapperComponent } from '../../components/dynamic-wrapper/dynamic-wrapper.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageService } from '../../services/page.service';
import { PageConfig } from '../../models/page-config.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import { take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [DynamicWrapperComponent],
  standalone: true,
})
export class HomePageComponent implements OnInit {
  @ViewChild('wrapper') wrapper: DynamicWrapperComponent;

  public currentPageConfig: PageConfig;
  private allPagesConfig: PageConfig[];

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService
      .getPageConfig()
      .pipe(take(1))
      .subscribe((config) => {
        if (config) {
          this.allPagesConfig = config;
        } else {
          console.error('Не удалось загрузить конфигурацию страницы');
        }
      });
  }

  reset() {
    this.wrapper.updateElements();
  }

  changePage(page: number) {
    this.currentPageConfig = this.allPagesConfig[page];
  }
}
