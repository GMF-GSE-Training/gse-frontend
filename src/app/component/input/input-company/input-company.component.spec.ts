import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCompanyComponent } from './input-company.component';

describe('InputCompanyComponent', () => {
  let component: InputCompanyComponent;
  let fixture: ComponentFixture<InputCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
