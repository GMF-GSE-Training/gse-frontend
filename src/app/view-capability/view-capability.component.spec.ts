import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCapabilityComponent } from './view-capability.component';

describe('ViewCapabilityComponent', () => {
  let component: ViewCapabilityComponent;
  let fixture: ComponentFixture<ViewCapabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCapabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
