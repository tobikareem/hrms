import { AsyncPipe, NgFor } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { ProjectService } from '../../../services/project.service';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { createSearch } from '../../../shared/functions/create-search';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [NgFor, ProjectCardComponent, AsyncPipe],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {

  private readonly projectService = inject(ProjectService);
  private readonly destroyRef = inject(DestroyRef);

  projects$ = this.projectService.getProjects();

  searchControl = new FormControl('');

  search$ = createSearch(this.searchControl, this.destroyRef);

  ngOnInit(): void {


    this.search$.subscribe((search) => {
      this.projects$ = search ? this.projectService.getProjectBySearchTerm(search) : this.projectService.getProjects();
    });
  }

}


