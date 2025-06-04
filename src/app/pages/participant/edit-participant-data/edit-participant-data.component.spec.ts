import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs'; // 'of' ditambahkan

import { EditParticipantDataComponent } from './edit-participant-data.component';
import { ParticipantService } from '../../../shared/service/participant.service';

describe('EditParticipantDataComponent', () => {
  let component: EditParticipantDataComponent;
  let fixture: ComponentFixture<EditParticipantDataComponent>;
  let participantService: ParticipantService;

  beforeEach(async () => {
    // Mock localStorage using spyOn
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
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'testId', participantId: 'testId' }),
              queryParamMap: convertToParamMap({}),
              queryParams: {}
            },
            paramMap: new BehaviorSubject(convertToParamMap({ id: 'testId', participantId: 'testId' })),
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
    participantService = TestBed.inject(ParticipantService);
    // Panggil ngOnInit secara eksplisit setelah mock siap
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable(); // Tunggu operasi asinkron selesai
  });

  afterEach(() => {
    // Clear mock localStorage after each test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(participantService.getParticipantById).toHaveBeenCalledWith('testId');
  });
});
