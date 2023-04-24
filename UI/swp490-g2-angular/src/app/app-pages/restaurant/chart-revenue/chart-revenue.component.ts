import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-revenue',
  templateUrl: './chart-revenue.component.html',
  styleUrls: ['./chart-revenue.component.scss']
})
export class ChartRevenueComponent implements OnInit {
  basicData: any;

  basicOptions: any;
  constructor() { }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['03/2022', '06/2022', '09/2022', '012/2022'],
      datasets: [
        {
          label: 'Price',
          data: [540, 325, 702, 620],
          backgroundColor: ['green'],
          borderColor: ['none'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
