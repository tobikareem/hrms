import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styles: [
    `.loading-container {
        position: relative;
      }
      .blocker {
        background-color: black;
        position: absolute;
        top: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        opacity: 0.4;
      }
    `
    ]
})
export class LoaderComponent {

  @Input({required: true}) isLoading = false;
}
