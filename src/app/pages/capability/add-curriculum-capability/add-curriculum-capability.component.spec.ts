import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurriculumCapabilityComponent } from './add-curriculum-capability.component';

describe('AddCurriculumCapabilityComponent', () => {
  let component: AddCurriculumCapabilityComponent;
  let fixture: ComponentFixture<AddCurriculumCapabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCurriculumCapabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCurriculumCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
