import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Added

import { CotDetailComponent } from './cot-detail.component';

describe('CotDetailComponent', () => {
  let component: CotDetailComponent;
  let fixture: ComponentFixture<CotDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CotDetailComponent, 
        RouterTestingModule,
        HttpClientTestingModule // Added
      ]
    })
    .compileComponents();

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user_profile') {
        return JSON.stringify({
          role: { name: 'mockAdminRole' } // Or 'user' depending on test case
        });
      }
      return null;
    });

    fixture = TestBed.createComponent(CotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
