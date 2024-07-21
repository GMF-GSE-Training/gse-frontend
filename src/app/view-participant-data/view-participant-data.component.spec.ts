import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParticipantDataComponent } from './view-participant-data.component';

describe('ViewParticipantDataComponent', () => {
  let component: ViewParticipantDataComponent;
  let fixture: ComponentFixture<ViewParticipantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewParticipantDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewParticipantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
