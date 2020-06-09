import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, AfterViewInit {

  @Input('projectId') projectId;
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
    this.getFullPropertyList();
  }

  ngAfterViewInit(){
    console.log("projectid", this.projectId)
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

  getFullPropertyList(params: any = '') {
    this.commonService.propertyList(params)
      .subscribe((result: any) => {
          if (result) this.propertyList = result;
          console.log('propertyList: ', this.propertyList);
        }, (err) => console.log({ err }),
        () => this.commonService.togglePageLoaderFn(false));

  }

}
