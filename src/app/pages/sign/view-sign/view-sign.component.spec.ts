import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignComponent } from './view-sign.component';

describe('ViewSignComponent', () => {
  let component: ViewSignComponent;
  let fixture: ComponentFixture<ViewSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
