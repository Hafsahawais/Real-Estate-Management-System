import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {HomeComponent} from "./pages/home/home.component";
import {SinglePropertyComponentNewUser} from "./pages/single-property-new-user/single-property-component-new-user.component";
import {ProjectListHomeComponent} from "./pages/project-list-home/project-list-home.component";
import {SingleProjectComponentNewUser} from "./pages/single-project-new-user/single-project-component-new-user.component";

const routes: Routes =[
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },{
    path: 'property/:id',
    component: SinglePropertyComponentNewUser
  },{
    path: 'project/:id',
    component: SingleProjectComponentNewUser
  },{
    path: 'projects',
    component: ProjectListHomeComponent
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      // useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
