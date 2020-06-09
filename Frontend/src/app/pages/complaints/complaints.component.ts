import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommonService} from "../../services/common.service";
import {MatDialog} from "@angular/material/dialog";
import {ComplaintSuccessDialog} from "./ComplaintSuccessDialog";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  complainDetails: FormGroup;
  constructor(private _formBuilder: FormBuilder,private commonService: CommonService,private dialog: MatDialog) { }

  ngOnInit() {
    this.complainDetails = this.complaintForm()
  }

  submitComplaint() {
    this.commonService.createComplain(this.complainDetails.value).subscribe(data => {
      console.log(data)
      if (data) {
        this.dialog.open(ComplaintSuccessDialog, {
          width: '700px',
          height: '200px'
        })

      }
    })

  }

  complaintForm(): FormGroup {
    return this._formBuilder.group({
      title: [''],
      type: ['Type'],
      description: ['']
    });
  }

}
