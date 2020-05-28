import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  getUrl() {
    return "url('./assets/img/theme/login-back.jpg')";
  }

}
