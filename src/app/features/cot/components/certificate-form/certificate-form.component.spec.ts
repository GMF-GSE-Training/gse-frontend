import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Added
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CertificateFormComponent } from './certificate-form.component';

describe('CertificateFormComponent', () => {
  let component: CertificateFormComponent;
  let fixture: ComponentFixture<CertificateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CertificateFormComponent,
        RouterTestingModule, // Added
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
