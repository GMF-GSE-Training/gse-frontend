import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Added

import { AddParticipantDataComponent } from './add-participant-data.component';

describe('AddParticipantDataComponent', () => {
  let component: AddParticipantDataComponent;
  let fixture: ComponentFixture<AddParticipantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddParticipantDataComponent, 
        RouterTestingModule,
        HttpClientTestingModule // Added
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddParticipantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
