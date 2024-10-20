import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityDetailComponent } from './capability-detail.component';

describe('CapabilityDetailComponent', () => {
  let component: CapabilityDetailComponent;
  let fixture: ComponentFixture<CapabilityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapabilityDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapabilityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
