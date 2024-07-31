import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantCotComponent } from './add-participant-cot.component';

describe('AddParticipantCotComponent', () => {
  let component: AddParticipantCotComponent;
  let fixture: ComponentFixture<AddParticipantCotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParticipantCotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddParticipantCotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
