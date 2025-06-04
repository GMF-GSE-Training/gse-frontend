import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CapabilityFormComponent } from './capability-form.component';

describe('CapabilityFormComponent', () => {
  let component: CapabilityFormComponent;
  let fixture: ComponentFixture<CapabilityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CapabilityFormComponent, 
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapabilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
