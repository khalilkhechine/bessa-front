import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2, chartExample3
} from '../../variables/charts';
import {BabyInformationService} from '../../services/baby-information.service';
import {DatePipe} from '@angular/common';
import {BabyService} from '../../services/baby.service';
import {Baby} from '../../models/baby.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public growthChart;
  public clicked = true;
  public clicked1 = false;
  babies: Baby[];
  selectedBabyId: any;

  constructor(private datePipe: DatePipe, private babyInfoService: BabyInformationService, private babyService: BabyService) {
  }
  ngOnInit() {
    this.babyService.findAll().subscribe(responseBabies => {
      this.babies = responseBabies.result;
      if (this.babies && this.babies.length > 0) {
        this.getBabyStat(this.babies[0]._id);
      }
    });
  }


  public updateOptions() {
    this.growthChart.data.datasets[0].data = this.data;
    this.growthChart.update();
  }

  private mapResponse(array: any[]) {
    const labels = array.map(e => this.datePipe.transform(e.date, 'short'));
    const valuesHeight = array.map(e => e.height);
    const valuesWeight = array.map(e => e.weight);
    return  {
      labels: labels,
      datasets: [
        {label: 'HEIGHT', data: valuesHeight},
        {label: 'WEIGHT', data: valuesWeight}
        ]
    };
  }

  getBabyStat(babyId) {
    this.selectedBabyId = babyId;
    this.babyInfoService.getHeightStat(babyId).subscribe(response => {
      const data = this.mapResponse(response);
      parseOptions(Chart, chartOptions());
      const chartGrowth = document.getElementById('chart-growth');
      this.growthChart = new Chart(chartGrowth, {
        type: 'line',
        options: chartExample1.options,
        data: data
      });
      this.growthChart.update();
    });

  }
}
