import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {CommonService} from "../../services/common.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userID: String;
  userDetails: FormGroup;

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userDetails = this.detailsForm()
    this.userID = this.userService.currentUser.user._id;
    this.getCurrentUserDetails(this.userID);
  }

  getCurrentUserDetails(userId) {
    this.commonService.togglePageLoaderFn(true);
    this.userService.getcurrentUserDetails(userId)
      .subscribe(data => {
        console.log(data)
        const {
          phoneNo,
          email,
          fname,
          lname,
          address,
          city,
          country,
          about,
        } = data;

        this.userDetails.patchValue({
          phoneNo,
          email,
          fname,
          lname,
          address,
          city,
          country,
          about,
        });
        this.commonService.togglePageLoaderFn(false);
      });
  }

  detailsForm(): FormGroup {
    return this._formBuilder.group({
      phoneNo: [{value:'', disabled: true}],
      email: [{value:'', disabled: true}],
      fname: [{value:'', disabled: true}],
      lname: [{value:'', disabled: true}],
      address: [{value:'', disabled: true}],
      city: [{value:'', disabled: true}],
      country: [{value:'', disabled: true}],
      about: [{value:'', disabled: true}],
    });
  }

  updateProfile() {

    this.userService.updateUserDetails(this.userID, this.userDetails.value).subscribe((data) => {
      console.log(data);
      if(data){
        location.reload()
      }
    })

  }

}
