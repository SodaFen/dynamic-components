import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicComponent } from '../../models/dynamic-component.model';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-dynamic-button',
  templateUrl: './dynamic-button.component.html',
  standalone: true,
})
export class DynamicButtonComponent implements DynamicComponent {
  @Input() config: any;
  @Output() event = new EventEmitter();

  handleClick() {
    this.event.emit({
      type: 'click',
      id: this.config.id,
    });
  }
}
