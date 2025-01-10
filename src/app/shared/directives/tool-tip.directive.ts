import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appToolTip]',
  standalone: true
})
export class ToolTipDirective {

  @Input() tooltip = '';
  constructor() { }

}
