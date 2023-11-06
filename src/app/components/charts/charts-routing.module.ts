import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartViewComponent } from './chart-view/chart-view.component';

const routes: Routes = [
  {
    path: '',
    component: ChartViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
