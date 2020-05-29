import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  public copy: string;
  properties: Array<any> = [];

  constructor() {
    this.properties = [
      {
        imgSrc: '../../../assets/img/theme/team-1-800x800.jpg',
        name: 'Cozy 5 Stars Apartment',
        price: 'Rs. 1,000,000',
        location: 'Karachi, Pakistan',
        status: 'Active',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
      },
      {
        imgSrc: '../../../assets/img/theme/team-2-800x800.jpg',
        name: 'Office Studio',
        price: 'Rs. 600,000',
        location: 'Lahore, Pakistan',
        status: 'Sold',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
      },
      {
        imgSrc: '../../../assets/img/theme/team-3-800x800.jpg',
        name: 'Beautiful Castle',
        price: 'Rs. 200,000,000',
        location: 'Islamabad, Pakistan',
        status: 'Acquired',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
      },
      {
        imgSrc: '../../../assets/img/theme/team-4-800x800.jpg',
        name: 'Home Studio',
        price: 'Rs. 400,000',
        location: 'Quetta, Pakistan',
        status: 'Active',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
      }
    ];
  }

  ngOnInit() {
  }

}
