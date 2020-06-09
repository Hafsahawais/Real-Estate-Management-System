import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  private projectId: any;

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  propertyTypeList = [];
  imgUrls = [];
  imgsToUpload = [];
  isSubmittingForm: Boolean = false;

  getPropertyTypeList() {
    this.commonService.togglePageLoaderFn(true);
    this.commonService.getPropertyTypeList()
      .subscribe(result => {
        // console.log(result);
        this.propertyTypeList = result;
        this.commonService.togglePageLoaderFn(false);
      });
  }


  submitForm(data) {
    console.log({ data });
    this.isSubmittingForm = true;
    data.value.userId = this.userService.currentUser.user._id;

    const imageData = new FormData();
    this.imgsToUpload.forEach((ele, index) => {
      imageData.append("propImages", ele, ele['name']);
    })
    for (let key in data.value) {
      // iterate and set other form data
      imageData.append(key, data.value[key])
    }
    if(this.projectId) {
      imageData.append('projectId', this.projectId)
    }
    console.log( imageData );
    this.commonService.togglePageLoaderFn(true);
    this.http.post(this.commonService.base_url + '/property/new', imageData)
      .subscribe(result => {
          console.log({ result });
          let data = result && result['result'] || {};
          let message = result && result['message'] || '';
          if (data && data['slug']) {
            this.commonService.changeHeaderMessage({ type: 'success', message });
            this.router.navigate([`/property/single-property/${data._id}`])
          }
          else this.commonService.changeHeaderMessage({ type: 'danger', message: 'Something Went Wrong' });
        }, err => {
          let errmessage = err.error && err.error.message || '';
          console.log({ err }, errmessage);
          this.commonService.changeHeaderMessage({ type: 'danger', message: errmessage });
          this.commonService.togglePageLoaderFn(false);
        },
        () => {
          this.commonService.togglePageLoaderFn(false);
        })
  }

  log(data) { console.log(data); }

  filesChange(fieldName: string, fileList) {
    console.log({ fileList });
    if (fileList && fileList.length) {
      // this.imgsToUpload = Object.values(fileList);
      let i = 0;
      Object.values(fileList).forEach(f => {
        if (fileList[i].size < 800000) {
          // console.log({ f });
          let reader = new FileReader();
          reader.readAsDataURL(fileList[i]);
          let name = fileList[i].name;
          // console.log(fileList[i]);
          this.imgsToUpload.push(f);
          reader.onload = (_event) => {
            this.imgUrls.push({ name, path: reader.result });
          }
        }
        i++;
      })
    }
    console.log('this.imgUrls', this.imgUrls, this.imgsToUpload);
  }

  removeSinglePic(img) {
    this.imgUrls = this.imgUrls.filter(e => img != e);
  }

  getDataTitleViaId(id, dataList, keyName) {
    if (!id || !dataList || !keyName) return '';

    let data = this[dataList].filter(e => e._id == id);
    return data.length && data[0][keyName] || '';
  }

  ngOnInit() {
    this.getPropertyTypeList();
    this.route.queryParams
      .subscribe(params => {
        console.log(params);

        this.projectId = params.projectId;
        console.log(this.projectId);
      });


  }

}
