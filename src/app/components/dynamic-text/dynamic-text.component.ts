import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicComponent } from '../../models/dynamic-component.model';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-dynamic-text',
  templateUrl: './dynamic-text.component.html',
  standalone: true,
})
export class DynamicTextComponent implements DynamicComponent {
  @Input() config: any;
  @Output() event = new EventEmitter();
}
