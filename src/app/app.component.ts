import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { IStore } from './models/store.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  events: string[] = [];
  opened: boolean = false;
  storeName!: string;

  constructor(private readonly storeService: StoreService) { }

  ngOnInit(): void {
    this.getStore();
  }

  toggleMenu() {
    this.opened = !this.opened;
  }

  private getStore(): void {
    this.storeService.getStore().subscribe({
      next: (store: IStore) => {
        this.storeName = `Shop Name: ${store.name}`;
      }
    })
  }
}
