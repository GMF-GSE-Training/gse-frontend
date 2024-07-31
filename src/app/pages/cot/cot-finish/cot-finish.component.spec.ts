import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotFinishComponent } from './cot-finish.component';

describe('CotFinishComponent', () => {
  let component: CotFinishComponent;
  let fixture: ComponentFixture<CotFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotFinishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
