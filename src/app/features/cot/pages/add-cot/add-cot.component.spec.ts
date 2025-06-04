import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Added
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AddCotComponent } from './add-cot.component';

describe('AddCotComponent', () => {
  let component: AddCotComponent;
  let fixture: ComponentFixture<AddCotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddCotComponent,
        HttpClientTestingModule // Added
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ participantId: 'test-id' }), // Sesuaikan jika perlu
              queryParamMap: convertToParamMap({}),
              queryParams: {}
            },
            paramMap: new BehaviorSubject(convertToParamMap({ participantId: 'test-id' })), // Sesuaikan jika perlu
            queryParamMap: new BehaviorSubject(convertToParamMap({})),
            queryParams: new BehaviorSubject({}),
            url: new BehaviorSubject([])
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
