import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSertifikatComponent } from './create-sertifikat.component';

describe('CreateSertifikatComponent', () => {
  let component: CreateSertifikatComponent;
  let fixture: ComponentFixture<CreateSertifikatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSertifikatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSertifikatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
