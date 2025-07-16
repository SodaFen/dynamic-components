import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';
import { DynamicTextComponent } from '../dynamic-text/dynamic-text.component';
import { DynamicComponent } from '../../models/dynamic-component.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PageConfig } from '../../models/page-config.model';

@UntilDestroy()
@Component({
  selector: 'app-dynamic-wrapper',
  templateUrl: './dynamic-wrapper.component.html',
  standalone: true,
})
export class DynamicWrapperComponent implements OnChanges {
  @Input() config: PageConfig;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRefs: ComponentRef<DynamicComponent>[] = [];

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnChanges() {
    this.renderComponents();
  }

  private renderComponents() {
    if (!this.container || !this.config) return;

    this.container.clear();
    this.componentRefs = [];

    this.config.elements.forEach((elementConfig) => {
      const componentFactory = this.getComponentFactory(elementConfig.type);
      if (!componentFactory) return;

      const componentRef = this.container.createComponent(componentFactory);

      componentRef.instance.config = elementConfig;
      componentRef.instance.event
        .pipe(untilDestroyed(this))
        .subscribe((event) => this.handleEvent(event));

      this.componentRefs.push(componentRef);
    });
  }

  private getComponentFactory(type: string) {
    switch (type) {
      case 'input':
        return this.resolver.resolveComponentFactory(DynamicInputComponent);
      case 'button':
        return this.resolver.resolveComponentFactory(DynamicButtonComponent);
      case 'text':
        return this.resolver.resolveComponentFactory(DynamicTextComponent);
      default:
        return null;
    }
  }

  private handleEvent(event: any): void {
    if (event.type === 'click' && event.id === 'submit') {
      this.collectFormData();
    }
  }

  private collectFormData(): void {
    const formData = {};

    this.componentRefs.forEach((ref) => {
      if (ref.instance instanceof DynamicInputComponent) {
        formData[ref.instance.config.id] = ref.instance.config.value;
      }
    });

    console.log(formData);
  }

  public updateElements(): void {
    this.componentRefs.forEach((ref) => {
      ref.instance.config.value = '';
    });
  }
}
