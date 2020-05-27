import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  places: Array<any> = [];
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor() {
    this.places = [
      {
        imgSrc: '../../../assets/img/theme/profile-cover.jpg',
        place: 'Cozy 5 Stars Apartment',
        description: 'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
        charge: 'Rs. 50,000,000',
        location: 'Karachi, Pakistan'
      },
      {
        imgSrc: '../../../assets/img/theme/team-1-800x800.jpg',
        place: 'Office Studio',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
        charge: 'Rs. 50,000,000',
        location: 'Karachi, Pakistan'
      },
      {
        imgSrc: '../../../assets/img/theme/team-4-800x800.jpg',
        place: 'Beautiful Castle',
        description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
        charge: 'Rs. 50,000,000',
        location: 'Karachi, China'
      }
    ];
  }

  ngOnInit() {

  //   this.datasets = [
  //     [0, 20, 10, 30, 15, 40, 20, 60, 60],
  //     [0, 20, 5, 25, 10, 30, 15, 40, 40]
  //   ];
  //   this.data = this.datasets[0];
  //
  //
  //   var chartOrders = document.getElementById('chart-orders');
  //
  //   parseOptions(Chart, chartOptions());
  //
  //
  //   var ordersChart = new Chart(chartOrders, {
  //     type: 'bar',
  //     options: chartExample2.options,
  //     data: chartExample2.data
  //   });
  //
  //   var chartSales = document.getElementById('chart-sales');
  //
  //   this.salesChart = new Chart(chartSales, {
	// 		type: 'line',
	// 		options: chartExample1.options,
	// 		data: chartExample1.data
	// 	});
  }
  //
  //
  //
  //
  //
  // public updateOptions() {
  //   this.salesChart.data.datasets[0].data = this.data;
  //   this.salesChart.update();
  // }

}
