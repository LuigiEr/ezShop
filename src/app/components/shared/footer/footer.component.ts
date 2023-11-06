import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() storeName!: string;
  public currentYear!: number;

  constructor() {
    this.getFullYear();
  }

  private getFullYear() {
    this.currentYear = new Date().getFullYear();
  }
}
