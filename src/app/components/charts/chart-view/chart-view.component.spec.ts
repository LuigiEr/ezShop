import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewComponent } from './chart-view.component';
import { StoreService } from 'src/app/services/store.service';
import { MockStatsCategoriesList } from 'src/test-mocks/stats-category.mock';
import { of, throwError } from 'rxjs';
import { PolarAreaChartComponent } from '../polar-area-chart/polar-area-chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('ChartViewComponent', () => {
  let component: ChartViewComponent;
  let fixture: ComponentFixture<ChartViewComponent>;
  let storeService: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    storeService = jasmine.createSpyObj('StoreService', ['getStatsCategories']);
    storeService.getStatsCategories.and.returnValue(of(MockStatsCategoriesList));

    TestBed.configureTestingModule({
      declarations: [ChartViewComponent, PolarAreaChartComponent],
      providers: [
        { provide: StoreService, useValue: storeService }
      ],
      imports: [
        NgChartsModule
      ],
    });
    fixture = TestBed.createComponent(ChartViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should populate the statsCategories variable with data coming from the StoreService', () => {
      fixture.detectChanges();

      expect(component.statsCategories).toBe(MockStatsCategoriesList);
      expect(component.isLoading).toBeFalsy();
    });

    it('should not populate the statsCategories variable due to API error', () => {
      storeService.getStatsCategories.and.returnValue(throwError(() => new Error()));
      fixture.detectChanges();

      expect(component.statsCategories).toEqual([]);
      expect(component.isLoading).toBeFalsy();
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should unsubscribe getStatsCategoriesSubscription', () => {
      spyOn(component['getStatsCategoriesSubscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(component['getStatsCategoriesSubscription'].unsubscribe).toHaveBeenCalled();
    });

    it('should not unsubscribe getStatsCategoriesSubscription', () => {
      spyOn(component['getStatsCategoriesSubscription'], 'unsubscribe');

      expect(component['getStatsCategoriesSubscription'].unsubscribe).not.toHaveBeenCalled();
    });
  });
});
