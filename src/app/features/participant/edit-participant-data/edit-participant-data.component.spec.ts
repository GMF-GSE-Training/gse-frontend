import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Added
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs'; // 'of' ditambahkan

import { EditParticipantDataComponent } from './edit-participant-data.component';
import { ParticipantService } from '../../../shared/service/participant.service';

describe('EditParticipantDataComponent', () => {
  let component: EditParticipantDataComponent;
  let fixture: ComponentFixture<EditParticipantDataComponent>;

  beforeEach(async () => {
    // Mock localStorage
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user_profile') {
        return JSON.stringify({ role: { name: 'Admin' }, participant: { id: 'testId' } });
      }
      return null;
    });
    spyOn(window.localStorage, 'setItem');
    spyOn(window.localStorage, 'removeItem');

    await TestBed.configureTestingModule({
      imports: [
        EditParticipantDataComponent,
        HttpClientTestingModule, // Added
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'testId' }), // Menyediakan 'id' untuk paramMap
              queryParamMap: convertToParamMap({}),
              queryParams: {}
            },
            paramMap: new BehaviorSubject(convertToParamMap({ id: 'testId' })),
            queryParamMap: new BehaviorSubject(convertToParamMap({})),
            queryParams: new BehaviorSubject({}),
            url: new BehaviorSubject([]) // Tambahkan mock untuk url
          }
        },
        {
          provide: ParticipantService,
          useValue: {
            getParticipantById: jasmine.createSpy('getParticipantById').and.returnValue(of({ id: 'testId', name: 'Test Participant', /* properti lain */ }))
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditParticipantDataComponent);
    component = fixture.componentInstance;
    // Panggil ngOnInit secara eksplisit setelah mock siap
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable(); // Tunggu operasi asinkron selesai
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
