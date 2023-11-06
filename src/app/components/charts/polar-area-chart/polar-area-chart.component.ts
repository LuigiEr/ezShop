import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { IStatsCategories } from 'src/app/models/stats-categories.interface';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.scss']
})
export class PolarAreaChartComponent implements OnChanges {
  @Input() statsCategories!: IStatsCategories[];

  // PolarArea
  public polarAreaChartLabels!: string[];
  public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [];
  public polarAreaLegend = true;
  public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: true,
  };

  constructor() {
  }

  ngOnChanges(): void {
    if(this.statsCategories) {

      this.polarAreaChartLabels = this.statsCategories.map(x => x.category);
      var numberOfProducts = this.statsCategories.map(x => x.numberOfProducts);

      this.polarAreaChartDatasets = [
        { data: numberOfProducts }
      ];
    }
  }
}
