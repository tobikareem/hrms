import { AfterViewInit, Directive, ElementRef, inject, InjectionToken, Input } from '@angular/core';
import { Constants } from '../utilities/constant';

export const TruncateLimit = new InjectionToken<number>('TruncateLimit');

@Directive({
  selector: '[appTruncate]',
  standalone: true
})
export class TruncateDirective implements AfterViewInit {

  private readonly constants = inject(Constants);
  private readonly elRef = inject(ElementRef);

  @Input() limit = inject(TruncateLimit, { optional: true }) ?? this.constants.fileTruncateLimit;

  ngAfterViewInit(): void {
    const text = this.elRef.nativeElement.textContent;

    if (text.length > this.limit) {
      this.elRef.nativeElement.textContent = text.substring(0, this.limit) + '...';
    }
  }

}
