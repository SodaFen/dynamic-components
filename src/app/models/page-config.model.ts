export interface PageConfig {
  elements: ElementConfig[];
}

export interface ElementConfig {
  type: 'input' | 'button' | 'text';
  id: string;
  styles?: {
    [key: string]: string;
  };
}
