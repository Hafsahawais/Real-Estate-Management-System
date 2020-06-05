import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router } from "@angular/router";
import {UserService} from "../../services/user.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: Array<string>;
  cityList = [];
  propertyTypeList;
  searchPropData = { propertyFor: 'sell' };
  hideOwnProperty = false;
  queryParams = '?status=available';
  propertyList = [] ;

  constructor(
    private _http: HttpClient,
    private userService: UserService,
    public commonService: CommonService,
    private router: Router
  ) { }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? [] : this.cityList.map(v => { return (v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)? v.name : ''
      }).filter(a => a).slice(0, 10) );

  ngOnInit() {
    this.hideOwnProperty = this.userService.currentUser && this.userService.currentUser.user._id ? true : false;
    this.getFullPropertyList()
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

  searchProp(value) {
    value.propertyFor = this.searchPropData.propertyFor;

    var queryParamsTemp: any = {
      propertyFor: value.propertyFor,
      type: value.type
    };

    queryParamsTemp.city = this.cityList.map(e => {
      return e.name == value.city ? e._id : ''
    }).filter(ele => ele);

    this.router.navigate(['/property/search'], {
      queryParams: queryParamsTemp //{ 'city': value.city, 'propertyFor': value.propertyFor, 'type': value.type }
    })
  }


  private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }

}
