import { ProjectService } from './../../../services/project.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../infrastructure/types/project';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent implements OnChanges {

  private readonly projectService = inject(ProjectService);

  @Input({required: true}) projectId!: number;

  project$: Observable<Project> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId']) {
      this.project$ = this.projectService.getProjectById(this.projectId);
    }
  }

}
