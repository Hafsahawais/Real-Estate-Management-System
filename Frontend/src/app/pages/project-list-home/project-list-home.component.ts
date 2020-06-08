import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-project-list-home',
  templateUrl: './project-list-home.component.html',
  styleUrls: ['./project-list-home.component.scss']
})
export class ProjectListHomeComponent implements OnInit {

  public copy: string;
  projects: Array<any> = [];
  projectList = []

  constructor(
    public commonService: CommonService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  getFullProjectList(params: any = '') {
    this.commonService.projectList(params)
      .subscribe((result: any) => {
          if (result) this.projectList = result;
          console.log('projectList: ', this.projectList);
        }, (err) => console.log({ err }),
        () => this.commonService.togglePageLoaderFn(false));

  }

  ngOnInit() {
    this.getFullProjectList()
  }
}
