import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelasiCotChartComponent } from './relasi-cot-chart.component';

describe('RelasiCotChartComponent', () => {
  let component: RelasiCotChartComponent;
  let fixture: ComponentFixture<RelasiCotChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelasiCotChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelasiCotChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
