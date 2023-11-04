import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  shopName = 'ezShop';
  events: string[] = [];
  opened: boolean = false;

  toggleMenu(){
    this.opened = !this.opened;
  }
}
