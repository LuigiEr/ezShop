import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStore } from 'src/app/models/store.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy {
  events: string[] = [];
  opened: boolean = false;
  shopeName!: string;
  private getStoreSubscription!: Subscription;

  constructor(private readonly storeService: StoreService) {}

  ngOnInit(): void {
    this.getStore();
  }

  toggleMenu() {
    this.opened = !this.opened;
  }

  private getStore(): void {
    this.getStoreSubscription = this.storeService.getStore().subscribe({
      next: (store: IStore) => {
        this.shopeName = `Shop Name: ${store.name}`;
      }
    });
  }

  ngOnDestroy(): void {
    this.getStoreSubscription?.unsubscribe();
  }
}
