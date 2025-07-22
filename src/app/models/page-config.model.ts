export type LayoutDirection = 'horizontal' | 'vertical';

export type ElementType = 'input' | 'button' | 'text';

export type FormElementConfig = InputConfig | ButtonConfig | TextConfig;

export interface PageConfig {
  title?: string;
  direction?: LayoutDirection;
  elements: FormElementConfig[];
  styles?: {
    [key: string]: string;
  };
}

export interface BaseElementConfig {
  type: ElementType;
  id: string;
  styles?: {
    [key: string]: string;
  };
}

export interface InputConfig extends BaseElementConfig {
  type: 'input';
  inputType?: string;
  placeholder?: string;
  value?: string | number;
}

export interface ButtonConfig extends BaseElementConfig {
  type: 'button';
  text: string;
  event?: string;
}

export interface TextConfig extends BaseElementConfig {
  type: 'text';
  content: string;
}
