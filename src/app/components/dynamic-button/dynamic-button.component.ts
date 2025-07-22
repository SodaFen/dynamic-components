import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ButtonConfig } from '../../models/page-config.model';

@UntilDestroy()
@Component({
  selector: 'app-dynamic-button',
  template: `{{ config.text }}`,
  standalone: true,
})
export class DynamicButtonComponent {
  @Input({ required: true }) config!: ButtonConfig;
  @Output() event = new EventEmitter<string>();

  @HostBinding('style')
  get styles() {
    return this.config.styles;
  }

  @HostListener('click')
  onClick() {
    this.event.emit(this.config.event);
  }
}
