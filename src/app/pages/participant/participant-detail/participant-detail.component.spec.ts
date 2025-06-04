import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router'; // Added ActivatedRoute and convertToParamMap
import { BehaviorSubject } from 'rxjs';

import { ParticipantDetailComponent } from './participant-detail.component';

describe('ParticipantDetailComponent', () => {
  let component: ParticipantDetailComponent;
  let fixture: ComponentFixture<ParticipantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantDetailComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ participantId: 'testId' }),
              queryParamMap: convertToParamMap({}), // Tambahkan ini jika belum ada
              queryParams: {} // Pastikan ini juga ada
            },
            paramMap: new BehaviorSubject(convertToParamMap({ participantId: 'testId' })),
            queryParamMap: new BehaviorSubject(convertToParamMap({})),
            queryParams: new BehaviorSubject({}),
            url: new BehaviorSubject([])
          }
        }
      ]
    })
    .compileComponents();

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user_profile') {
        return JSON.stringify({
          participant: { id: 'fallback-participant-id-123' },
          role: { name: 'mockRole' } // Add role if other parts of component need it
        });
      }
      if (key === 'pas_foto') {
        return 'mock_pas_foto_data_url';
      }
      if (key === 'qr_code') {
        return 'mock_qr_code_data_url';
      }
      return null;
    });

    fixture = TestBed.createComponent(ParticipantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
