import { AsyncPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input, numberAttribute, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../infrastructure/types/project';
import { ProjectService } from '../../../services/project.service';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, ProjectCardComponent, NgOptimizedImage],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnChanges {

  @Input({ required: true, transform: numberAttribute }) id!: number;

  private readonly projectService = inject(ProjectService);

  project$: Observable<Project> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.project$ = this.projectService.getProjectById(this.id);
    }
  }

}
