import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { PolarAreaChartComponent } from './polar-area-chart/polar-area-chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ChartViewComponent, PolarAreaChartComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    NgChartsModule,
    MatProgressSpinnerModule,
  ]
})
export class ChartsModule { }
