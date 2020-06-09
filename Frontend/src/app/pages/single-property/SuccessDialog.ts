import {Component} from '@angular/core';

@Component({
  selector: 'success-dialog',
  template: `
    <h1 mat-dialog-title>Success</h1>
  <div mat-dialog-content>The Payment was successful.</div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Close</button>
  </div>
  `,
})
export class SuccessDialog {}
