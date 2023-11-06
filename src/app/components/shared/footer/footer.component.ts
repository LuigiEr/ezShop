import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class FooterComponent {
  public currentYear!: number;

  constructor() {
    this.getFullYear();
  }

  private getFullYear() {
    this.currentYear = new Date().getFullYear();
  }
}
