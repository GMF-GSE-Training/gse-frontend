import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailParticipantDataComponent } from './detail-participant-data.component';

describe('DetailParticipantDataComponent', () => {
  let component: DetailParticipantDataComponent;
  let fixture: ComponentFixture<DetailParticipantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailParticipantDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailParticipantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
