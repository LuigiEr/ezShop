import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { StoreService } from 'src/app/services/store.service';
import { of } from 'rxjs';
import { MockStore } from 'src/test-mocks/store.mock';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FooterComponent } from '../footer/footer.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let storeService: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    storeService = jasmine.createSpyObj('StoreService', ['getStore']);
    storeService.getStore.and.returnValue(of(MockStore));

    TestBed.configureTestingModule({
      declarations: [SideNavComponent, FooterComponent],
      imports: [MatSidenavModule, BrowserAnimationsModule, MatToolbarModule, MatIconModule, AppRoutingModule],
      providers: [
        { provide: StoreService, useValue: storeService }
      ]
    });

    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should populate the shopeName variable with data coming from the StoreService', () => {
      var expectedResult = `Shop Name: ${MockStore.name}`;

      fixture.detectChanges();

      expect(component.shopeName).toBe(expectedResult);
    });
  });

  describe('toggleMenu', () => {
    it('should change the value for the "opened" value from false to true and vice versa', () => {
      fixture.detectChanges();
      expect(component.opened).toBeFalsy();

      component.toggleMenu();
      expect(component.opened).toBeTruthy();

      component.toggleMenu();
      expect(component.opened).toBeFalsy();
    });
  });
});
