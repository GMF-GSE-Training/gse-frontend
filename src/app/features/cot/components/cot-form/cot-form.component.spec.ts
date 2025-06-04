import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Added

import { CotFormComponent } from './cot-form.component';

describe('CotFormComponent', () => {
  let component: CotFormComponent;
  let fixture: ComponentFixture<CotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CotFormComponent, 
        HttpClientTestingModule,
        RouterTestingModule // Added
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
