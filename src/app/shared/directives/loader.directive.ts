import { ComponentRef, Directive, EmbeddedViewRef, inject, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';

@Directive({
  selector: '[loading]',
  standalone: true
})
export class LoaderDirective implements OnInit, OnChanges {

  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  @Input() loading = false;

  templateView: EmbeddedViewRef<any> | null = null;
  loaderRef: ComponentRef<LoaderComponent> | null = null;

  ngOnInit(): void {
    this.templateView = this.templateRef.createEmbeddedView({});
    
    this.loaderRef = this.viewContainerRef.createComponent(LoaderComponent, {
      injector: this.viewContainerRef.injector,
      projectableNodes: [this.templateView.rootNodes]
    });

    this.loaderRef.setInput('isLoading', this.loading);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'] && this.loaderRef) {
      this.loaderRef.setInput('isLoading', this.loading);
    }
  }

}
