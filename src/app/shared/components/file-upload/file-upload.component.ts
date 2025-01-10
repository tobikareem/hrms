import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  @Input({ required: true }) label!: string;
  @Input({ transform: (value: string) => value.split(',') }) accept: string[] = [];
  @Output() selected = new EventEmitter<FileList>();

  errorMessage = '';

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target && target.files) {
      const files: FileList = target.files;

      this.errorMessage = Array.from(files)
        .every(f => this.accept.includes(f.type)) ? '' : 'Invalid file type';

      if (this.errorMessage === '') {
        this.selected.emit(files);
        if (target && target.files) {
          this.selected.emit(target.files);
        }
        this.selected.emit(target.files);
      }
    }
  }
}
