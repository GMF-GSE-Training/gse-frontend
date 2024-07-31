import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCotComponent } from './detail-cot.component';

describe('DetailCotComponent', () => {
  let component: DetailCotComponent;
  let fixture: ComponentFixture<DetailCotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
