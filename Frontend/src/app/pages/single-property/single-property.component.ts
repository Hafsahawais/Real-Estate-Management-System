import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {

  public copy: string;
  property = [];
  private propertyId: string;
  private userID: any;
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
    this.propertyId = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.propertyId) this.getPropertyDetails()
  }

  getPropertyDetails() {
    this.commonService.getSingleProperty(this.propertyId).subscribe(data => {
      console.log(data)
      this.property = data.result;
    })

  }


  buyProperty(price) {
    let user;
    this.userID = this.userService.currentUser.user._id;
   this.userService.getcurrentUserDetails(this.userID).subscribe(data => {
     user = data
     this.userService.makePayment({email: user.email, amount: price }).subscribe(res => {
       const clientSecret = res.data['client_secret'];
       const result = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
           card: elements.getElement(CardElement),
           billing_details: {
             email: email,
           },
         },
       });
     })
   })
  }
}
