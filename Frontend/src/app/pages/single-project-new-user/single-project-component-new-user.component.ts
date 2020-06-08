import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-single-project-new-user',
  templateUrl: './single-project-component-new-user.component.html',
  styleUrls: ['./single-project-component-new-user.component.scss']
})
export class SingleProjectComponentNewUser implements OnInit {

  public copy: string;
  project = [];
  private projectId: string;


  constructor(
    private commonService: CommonService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.projectId) this.getProjectDetails()
  }

  getProjectDetails() {
    this.commonService.getSingleProject(this.projectId).subscribe(data => {
      console.log(data)
      this.project = data.result;
    })

  }


}
