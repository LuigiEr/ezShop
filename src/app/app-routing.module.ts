import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule) },
  { path: 'chart-view', loadChildren: () => import('./components/charts/charts.module').then(m => m.ChartsModule) },
  { path: '**', redirectTo: 'product-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
