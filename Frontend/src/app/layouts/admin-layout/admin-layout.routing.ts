import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ProjectListComponent } from '../../pages/project-list/project-list.component';
import { PropertyListComponent } from '../../pages/property-list/property-list.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ComplaintsComponent } from '../../pages/complaints/complaints.component';
import {AddPropertyComponent} from "../../pages/add-property/add-property.component";
import {AddProjectComponent} from "../../pages/add-project/add-project.component";
import {SinglePropertyComponent} from "../../pages/single-property/single-property.component";
import {SingleProjectComponent} from "../../pages/single-project/single-project.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'complaints',     component: ComplaintsComponent },
    { path: 'projects',       component: ProjectListComponent },
    { path: 'properties',     component: PropertyListComponent },
    { path: 'add-property',   component: AddPropertyComponent },
    { path: 'add-project',    component: AddProjectComponent },
    { path: 'single-property',    component: SinglePropertyComponent },
    { path: 'single-project',    component: SingleProjectComponent },
];
