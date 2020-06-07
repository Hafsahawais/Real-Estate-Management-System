import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ProjectListComponent } from '../../pages/project-list/project-list.component';
import { PropertyListComponent } from '../../pages/property-list/property-list.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ComplaintsComponent } from '../../pages/complaints/complaints.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AddPropertyComponent} from "../../pages/add-property/add-property.component";
import {AddProjectComponent} from "../../pages/add-project/add-project.component";
import {SinglePropertyComponent} from "../../pages/single-property/single-property.component";
import {SingleProjectComponent} from "../../pages/single-project/single-project.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ComplaintsComponent,
    ProjectListComponent,
    PropertyListComponent,
    AddPropertyComponent,
    AddProjectComponent,
    SinglePropertyComponent,
    SingleProjectComponent
  ]
})

export class AdminLayoutModule {}
