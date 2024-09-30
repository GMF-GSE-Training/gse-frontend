import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFilesParticipantsComponent } from './display-files-participants.component';

describe('DisplayFilesParticipantsComponent', () => {
  let component: DisplayFilesParticipantsComponent;
  let fixture: ComponentFixture<DisplayFilesParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayFilesParticipantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayFilesParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
