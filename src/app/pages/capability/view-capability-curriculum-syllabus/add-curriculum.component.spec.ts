import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCapabilityCurriculumSyllabusComponent } from './add-curriculum.component';

describe('ViewCapabilityCurriculumSyllabusComponent', () => {
  let component: ViewCapabilityCurriculumSyllabusComponent;
  let fixture: ComponentFixture<ViewCapabilityCurriculumSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCapabilityCurriculumSyllabusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCapabilityCurriculumSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
