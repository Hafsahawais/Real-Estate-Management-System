import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {HomeComponent} from "./pages/home/home.component";
import {SinglePropertyComponentNewUser} from "./pages/single-property-new-user/single-property-component-new-user.component";
import {SingleProjectComponentNewUser} from "./pages/single-project-new-user/single-project-component-new-user.component";
import {ProjectListHomeComponent} from "./pages/project-list-home/project-list-home.component";
import {LoginService} from "./services/login.service";
import {RegistrationValidators} from "./validators/registration.validators";
import {AuthGuardService} from "./services/auth-guard.service";
import {CommonModule} from "@angular/common";
import {AdminLayoutRoutes} from "./layouts/admin-layout/admin-layout.routing";
import {ClipboardModule} from "ngx-clipboard";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    ClipboardModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    ProjectListHomeComponent,
    SinglePropertyComponentNewUser,
    SingleProjectComponentNewUser
  ],
  providers: [
    LoginService,
    RegistrationValidators,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
