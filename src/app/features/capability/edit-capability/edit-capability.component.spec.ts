import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Added
import { RouterTestingModule } from '@angular/router/testing'; // Added

import { EditCapabilityComponent } from './edit-capability.component';

describe('EditCapabilityComponent', () => {
  let component: EditCapabilityComponent;
  let fixture: ComponentFixture<EditCapabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditCapabilityComponent,
        HttpClientTestingModule, // Added
        RouterTestingModule // Added
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
