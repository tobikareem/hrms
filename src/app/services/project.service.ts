import { Injectable } from '@angular/core';
import { Project } from '../infrastructure/types/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [];

  constructor() {
    this.projects =
      [{
        id: 1,
        name: 'Project 1',
        description: 'Project 1 Description',
        image: 'https://via.placeholder.com/150',
        subProjectIds: [1]
      },
      {
        id: 2,
        name: 'Project 2',
        description: 'Project 2 Description',
        image: 'https://via.placeholder.com/150',
        subProjectIds: [2]
      }
      ];
  }

  getProjects(): Observable<Project[]> {

    return new Observable<Project[]>(observer => {
      observer.next(this.projects);
    });

  }

  getProjectBySearchTerm(searchTerm: string): Observable<Project[]> {

    return new Observable<Project[]>(observer => {
      observer.next(this.projects);
    });

  }

  getProjectById(projectId: number): Observable<Project> {

    return new Observable<Project>(observer => {
      const project = this.projects.find(p => p.id === projectId);

      if (project) {
        observer.next(project);
      } else {
        observer.error('Project not found');
      }
    });
  }

}
