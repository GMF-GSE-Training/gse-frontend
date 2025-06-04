import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CurriculumSyllabusFormComponent } from './curriculum-syllabus-form.component';

describe('CurriculumSyllabusFormComponent', () => {
  let component: CurriculumSyllabusFormComponent;
  let fixture: ComponentFixture<CurriculumSyllabusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumSyllabusFormComponent, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumSyllabusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
