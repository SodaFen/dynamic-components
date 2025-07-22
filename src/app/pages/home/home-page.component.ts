import { Component, Input, OnChanges } from '@angular/core';
import {
  ButtonConfig,
  FormElementConfig,
  InputConfig,
  PageConfig,
  TextConfig,
} from '../../models/page-config.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicTextComponent } from '../../components/dynamic-text/dynamic-text.component';
import { DynamicInputComponent } from '../../components/dynamic-input/dynamic-input.component';
import { DynamicButtonComponent } from '../../components/dynamic-button/dynamic-button.component';

@UntilDestroy()
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicTextComponent,
    DynamicInputComponent,
    DynamicButtonComponent,
  ],
})
export class HomePageComponent implements OnChanges {
  @Input() config: PageConfig;

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    this.createForm();
  }

  private createForm() {
    const formGroup = {};

    this.config.elements?.forEach((element) => {
      if (element.type === 'input') {
        formGroup[element.id] = [element.value];
      }
    });

    this.form = this.formBuilder.group(formGroup);
  }
  get isHorizontal(): boolean {
    return this.config.direction === 'horizontal';
  }

  getInputConfig(element: FormElementConfig) {
    return element as InputConfig;
  }

  getButtonConfig(element: FormElementConfig) {
    return element as ButtonConfig;
  }

  getTextConfig(element: FormElementConfig) {
    return element as TextConfig;
  }

  handleAction(element: FormElementConfig) {
    //Реализация через switch case для удобства добавления новых ивентов
    if (element.type === 'button') {
      switch (element.event) {
        case 'submit':
          console.log('Форма', this.form.value);
          break;
      }
    }
  }
}
