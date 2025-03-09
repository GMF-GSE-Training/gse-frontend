import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CotService } from '../../shared/service/cot.service';
import { of } from 'rxjs';
import { CotResponse } from '../../shared/model/cot.model';
import { WebResponse } from '../../shared/model/web.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockCotService: jasmine.SpyObj<CotService>;

  beforeEach(async () => {
    // Buat mock untuk CotService
    mockCotService = jasmine.createSpyObj('CotService', ['listCot']);

    // Mock data yang sesuai dengan CotResponse dan Capability
    const mockCotResponse: CotResponse[] = [
      {
        id: 'cot1',
        startDate: '2025-03-01',
        endDate: '2025-03-09',
        trainingLocation: 'Jakarta',
        theoryInstructorRegGse: 'Instr1',
        theoryInstructorCompetency: 'Instr2',
        practicalInstructor1: 'Instr3',
        practicalInstructor2: 'Instr4',
        numberOfParticipants: 1,
        status: true,
        capability: {
          id: 'cap1',              // Wajib
          ratingCode: 'A1',        // Wajib
          trainingCode: 'TC001',   // Wajib
          trainingName: 'Ground Power System' // Wajib
        }
      }
    ];

    const mockResponse: WebResponse<CotResponse[]> = {
      code: 200,
      status: 'success',
      data: mockCotResponse,
      paging: {
        totalPage: 1,
        currentPage: 1,
        size: 6
      }
    };

    mockCotService.listCot.and.returnValue(of(mockResponse));

    // Konfigurasi TestBed
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: CotService, useValue: mockCotService }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getListCot on refreshData', () => {
    spyOn(component, 'getListCot');
    component.refreshData();
    expect(component.getListCot).toHaveBeenCalledWith('', 1, 6, '', '');
  });

  it('should map cot data correctly', () => {
    component.getListCot('', 1, 6, '', '');
    fixture.detectChanges();
    expect(component.cot.length).toBe(1);
    expect(component.cot[0].capability.trainingName).toBe('Ground Power System');
    expect(component.cot[0].numberOfParticipants).toBe(1);
    expect(component.cot[0].capability.ratingCode).toBe('A1');
  });
});
