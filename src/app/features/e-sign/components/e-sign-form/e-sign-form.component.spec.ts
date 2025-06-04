import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Added

import { ESignFormComponent } from './e-sign-form.component';

describe('ESignFormComponent', () => {
  let component: ESignFormComponent;
  let fixture: ComponentFixture<ESignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ESignFormComponent, 
        RouterTestingModule,
        HttpClientTestingModule // Added
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ESignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
