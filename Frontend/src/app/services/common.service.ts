import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommonService {

  constructor(
    private http: HttpClient,
    private titleService: Title
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Header alert text
  HeaderMessage = new Subject<string>();
  HeaderMessage$ = this.HeaderMessage.asObservable();

  changeHeaderMessage(data) {
    this.HeaderMessage.next(data);
  }
  // Header alert text

  togglePageLoader = new Subject<boolean>();
  togglePageLoader$ = this.togglePageLoader.asObservable();
  togglePageLoaderFn(data: boolean = false){
    this.togglePageLoader.next(data);
  }

  // showLoader() { this.togglePageLoader.next(true); }
  // hideLoader() { this.togglePageLoader.next(false); }

  base_url = 'http://localhost:3000';


  getPropertyTypeList(): Observable<any>{
    return this.http.get<any>(this.base_url + '/property/type');
  }

  propertyList(param = ''){
    return this.http.get<any>(this.base_url + '/property/list/' + param);
  }

  myProperties(param) {
    return this.http.get<any>(this.base_url + '/property/myProperty/' + param);
  }

  projectList(param = ''){
    return this.http.get<any>(this.base_url + '/project/projectList/' + param);
  }

  getSingleProperty(propertyId){
    return this.http.get<any>(this.base_url + '/property/single/' + propertyId);
  }

  getSingleProject(projectId){
    return this.http.get<any>(this.base_url + '/project/single/' + projectId);
  }

  filterProperties(param = ''){
    return this.http.get<any>(this.base_url + '/property/filter' + param );
  }

}
