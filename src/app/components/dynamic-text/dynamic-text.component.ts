import { Component, HostBinding, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TextConfig } from '../../models/page-config.model';

@UntilDestroy()
@Component({
  selector: 'app-dynamic-text',
  template: `{{ config.content }}`,
  standalone: true,
})
export class DynamicTextComponent {
  @Input({ required: true }) config!: TextConfig;

  @HostBinding('style')
  get styles() {
    return this.config.styles;
  }
}
