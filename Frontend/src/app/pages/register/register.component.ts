import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationValidators} from "../../validators/registration.validators";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private  userService: UserService,
    private registrationValidators: RegistrationValidators,
    private http: HttpClient,
    private router: Router
  ) { }

  signUpForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cPassword: new FormControl('', [Validators.required]),
      agree: new FormControl('', [Validators.required])
    }, { validators: this.registrationValidators.passwordMatch }
  );
  get fname() {
    return this.signUpForm.get('fname');
  }
  get lName() {
    return this.signUpForm.get('lname');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get phoneNo() {
    return this.signUpForm.get('phoneNo');
  }
  get registrationPassword() {
    return this.signUpForm.get('password');
  }
  get registrationcPassword() {
    return this.signUpForm.get('cPassword');
  }
  get agree() {
    return this.signUpForm.get('agree');
  }

  mainErrorMessage = {
    type: '',
    message: ''
  }

  ngOnInit() {
  }

  signUp() {
    console.log(this.signUpForm.value);
    this.userService.signUp(this.signUpForm.value)
      .subscribe(response => {
          console.log('--- reg form -- ', response);
          if(response && response['message']){
            this.router.navigate(['/'], {
              queryParams: { action: 'signUpsuccess' }
            });
          }
        },
        (error: Response) => {
          this.mainErrorMessage.type = 'danger';

          if(error.status === 400 ){
            this.mainErrorMessage.message = 'Your request is invalid';
          }
          else if(error.status){
            this.mainErrorMessage.message = 'Something went wrong';
          }
        });
  }
  getUrl() {
    return "url('./assets/img/theme/login-back.jpg')";
  }

}
