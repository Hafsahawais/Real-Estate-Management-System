import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnChanges {

  public copy: string;
  properties = [];
  propertyList = [];
  @Input('queryParams') queryParams = '';
  @Input('hideOwnProperty') hideOwnProperty = false;

  constructor(
    private commonService: CommonService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {
    this.properties = [
      {
        imgSrc: '../../../assets/img/theme/team-1-800x800.jpg',
        name: 'Cozy 5 Stars Apartment',
        price: 'Rs. 1,000,000',
        location: 'Karachi, Pakistan',
        status: 'Active',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
      },
      {
        imgSrc: '../../../assets/img/theme/team-2-800x800.jpg',
        name: 'Office Studio',
        price: 'Rs. 600,000',
        location: 'Lahore, Pakistan',
        status: 'Sold',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
      },
      {
        imgSrc: '../../../assets/img/theme/team-3-800x800.jpg',
        name: 'Beautiful Castle',
        price: 'Rs. 200,000,000',
        location: 'Islamabad, Pakistan',
        status: 'Acquired',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
      },
      {
        imgSrc: '../../../assets/img/theme/team-4-800x800.jpg',
        name: 'Home Studio',
        price: 'Rs. 400,000',
        location: 'Quetta, Pakistan',
        status: 'Active',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
      }
    ];
  }

  ngOnInit() {
    this.getPropertyList(this.queryParams);
  }

  ngOnChanges() {
    this.getPropertyList(this.queryParams);
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

}
