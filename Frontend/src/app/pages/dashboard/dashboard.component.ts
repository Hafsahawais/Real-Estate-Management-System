import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import {CommonService} from "../../services/common.service";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() projectId;
  public copy: string;
  properties = [];
  propertyList = [];
  @Input('queryParams') queryParams = '';
  @Input('hideOwnProperty') hideOwnProperty = false;

  constructor(
    public commonService: CommonService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getMyProperties();
  }

  getPropertyList(params: any = '') {
    this.commonService.togglePageLoaderFn(true);
    if (this.hideOwnProperty && this.userService.currentUser && this.userService.currentUser.user._id) params = this.queryParams ? `${params}&notUserId=${this.userService.currentUser.user._id}` : `?notUserId=${this.userService.currentUser.user._id}`;
    console.log('final query ', params);
    this.commonService.filterProperties(params)
      .subscribe((result: any) => {
          if (result) this.propertyList = result;
          console.log('propertyList: ', this.propertyList);
        }, (err) => console.log({ err }),
        () => this.commonService.togglePageLoaderFn(false));

  }

  getMyProperties() {
    const userId = this.userService.currentUser.user._id;
    this.commonService.myProperties(userId)
      .subscribe((result: any) => {
          if (result) this.propertyList = result.result;
          console.log('propertyList: ', this.propertyList);
        }, (err) => console.log({ err }),
        () => this.commonService.togglePageLoaderFn(false));

  }


}
