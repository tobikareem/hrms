import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

export const ProjectsRoute: Routes = [
    { path: 'list', component: ProjectListComponent },
    {
        path: 'details/:id',
        component: ProjectDetailsComponent,
    },
    {
        path: 'create',
        component: CreateProjectComponent
    },
    {
        path: 'edit',
        component: EditProjectComponent
    },
]

