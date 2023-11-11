import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsRoutingModule } from './products-routing.module';
import { TruncateTextPipe } from 'src/app/pipes/truncate-text.pipe';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    AddProductDialogComponent,
    ConfirmDialogComponent,
    TruncateTextPipe
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ProductsModule { }
