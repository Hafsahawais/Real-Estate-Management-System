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
import {AuthGuardService} from "../../services/auth-guard.service";

export const AdminLayoutRoutes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'user-profile',
      component: UserProfileComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'complaints',
      component: ComplaintsComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'project-list',
      component: ProjectListComponent,
      canActivate: [AuthGuardService]
    },
    { path: 'properties',
      component: PropertyListComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'add-property',
      component: AddPropertyComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'add-project',
      component: AddProjectComponent,
      canActivate: [AuthGuardService]
    },
    { path: 'single-property/:id',    component: SinglePropertyComponent },
    { path: 'single-project/:id',    component: SingleProjectComponent },
];
