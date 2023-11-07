import { Component, OnInit } from '@angular/core';
import { IStatsCategories } from 'src/app/models/stats-categories.interface';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {
  statsCategories!: IStatsCategories[];
  isLoading: boolean = false;

  constructor(private readonly storeService: StoreService) {}

  ngOnInit(): void {
    this.getStatusCategories();
  }

  private getStatusCategories(): void {
    this.isLoading = true;
    this.storeService.getStatsCategories().subscribe({
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
}
