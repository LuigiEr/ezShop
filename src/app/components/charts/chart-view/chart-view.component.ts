import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStatsCategories } from 'src/app/models/stats-categories.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit, OnDestroy {
  statsCategories: IStatsCategories[] = [];
  isLoading: boolean = false;
  private getStatsCategoriesSubscription!: Subscription;

  constructor(private readonly storeService: StoreService) {}

  ngOnInit(): void {
    this.getStatusCategories();
  }

  private getStatusCategories(): void {
    this.isLoading = true;
    this.getStatsCategoriesSubscription = this.storeService.getStatsCategories().subscribe({
      next: (statsCategories: IStatsCategories[]) => {
        this.statsCategories = statsCategories;
      },
      complete: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.getStatsCategoriesSubscription?.unsubscribe();
  }
}
