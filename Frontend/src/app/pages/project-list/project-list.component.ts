import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  public copy: string;
  projects: Array<any> = [];
  projectList = []
  user;

  constructor(
    public commonService: CommonService,
    public loginService: LoginService,
    public userService: UserService,
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
    this.userService.getcurrentUserDetails(this.userService.currentUser.user._id).subscribe(data => {
      this.user=data;
    })
  }
}
