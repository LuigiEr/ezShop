import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarAreaChartComponent } from './polar-area-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { MockStatsCategoriesList } from 'src/test-mocks/stats-category.mock';

describe('PolarAreaChartComponent', () => {
  let component: PolarAreaChartComponent;
  let fixture: ComponentFixture<PolarAreaChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolarAreaChartComponent],
      imports: [
        NgChartsModule
      ],
    });
    fixture = TestBed.createComponent(PolarAreaChartComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should populate correctly the polar charts variables', () => {
      component.statsCategories = MockStatsCategoriesList;
      component.ngOnChanges();

      var polarAreaChartLabels = MockStatsCategoriesList.map(x => x.category);
      var numberOfProducts = MockStatsCategoriesList.map(x => x.numberOfProducts);
      var polarAreaChartDatasets = [ { data: numberOfProducts } ];

      expect(component.polarAreaChartLabels).toEqual(polarAreaChartLabels);
      expect(component.polarAreaChartDatasets).toEqual(polarAreaChartDatasets);
    });

    it('should not populate the polar charts variables', () => {
      component.ngOnChanges();

      expect(component.polarAreaChartLabels).toEqual([]);
      expect(component.polarAreaChartDatasets).toEqual([]);
    });
  });
});
