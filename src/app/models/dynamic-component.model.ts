import { EventEmitter } from '@angular/core';

export interface DynamicComponent {
  config: any;
  event: EventEmitter<any>;
  updateConfig?(changes: any): void;
}
