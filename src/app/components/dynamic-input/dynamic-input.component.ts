import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicComponent } from '../../models/dynamic-component.model';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  standalone: true,
})
export class DynamicInputComponent implements DynamicComponent {
  @Input() config: any;
  @Output() event = new EventEmitter();

  onInput(event: any) {
    this.config.value = event.target.value;
    this.event.emit({
      type: 'input',
      value: event.target.value,
      id: this.config.id,
    });
  }
}
