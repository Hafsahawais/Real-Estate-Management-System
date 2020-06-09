import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {StripePaymentComponent} from "../payment-page/stripe-payment.component";
import {MatDialog} from "@angular/material/dialog";
import {SuccessDialog} from "./SuccessDialog";

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
    private dialog: MatDialog,
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


  createOrder(price, token) {
    let user;
    this.userID = this.userService.currentUser.user._id;
   this.userService.getcurrentUserDetails(this.userID).subscribe(data => {
     user = data
     this.userService.makePayment({email: user.email, amount: price, stripeToken: token }).subscribe(res => {
        console.log(res);
        if(res.status === 'succeeded'){
          this.dialog.open(SuccessDialog,{
            width: '700px',
            height: '200px'

          })
        }
     })
   })
  }

  checkout(price) {
    const dialogRef = this.dialog.open(StripePaymentComponent, {
      // opening dialog here which will give us back stripeToken
      width: '700px',
      height: '200px',
      data: {totalAmount: price},
    });
    dialogRef.afterClosed()
      // waiting for stripe token that will be given back
      .subscribe((result: any) => {
        if (result) {
          this.createOrder(price ,result.token.id);
        }
      });
  }
}
