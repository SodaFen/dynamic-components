import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { InputConfig } from '../../models/page-config.model';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-dynamic-input',
  template: `
    <input
      [type]="config.inputType || 'text'"
      [placeholder]="config.placeholder"
      [value]="value"
      (input)="onInput($event)"
    />
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicInputComponent),
      multi: true,
    },
  ],
})
export class DynamicInputComponent implements ControlValueAccessor {
  @Input({ required: true }) config!: InputConfig;

  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  @HostBinding('style')
  get styles() {
    return this.config.styles;
  }

  @HostBinding('type')
  get inputType() {
    return this.config.inputType || 'text';
  }

  @HostBinding('placeholder')
  get placeholder() {
    return this.config.placeholder;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }
}
