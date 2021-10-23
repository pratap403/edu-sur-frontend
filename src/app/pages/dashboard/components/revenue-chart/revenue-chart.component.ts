import { Component, Input, OnInit } from '@angular/core';

import { RevenueChartData } from '../../models';
import { colors } from '../../../../consts';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss']
})
export class RevenueChartComponent implements OnInit {
  @Input() revenueCharData: any;
  public revenueChart: any;
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    setTimeout(() => {
      this.initChart();
    }, 300);
  }

  public initChart(): void {
    this.revenueChart = {
      color: [colors.GREEN, colors.YELLOW],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: 'center',
        right: 'right',
        data: ['Submitted', 'Pending'],
        textStyle: {
          color: '#6E6E6E'
        }
      },
      series: [{
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['24%', '50%'],
        label: {
          show: false
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        hoverAnimation: false,
        avoidLabelOverlap: false,
        data: [
          {
            name: 'Submitted',
            value: this.revenueCharData.submitted
          },
          {
            name: 'Pending',
            value: this.revenueCharData.pending
          }
        ]
      }]
    };
  }
}
