import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSertifikatComponent } from './download-sertifikat.component';

describe('DownloadSertifikatComponent', () => {
  let component: DownloadSertifikatComponent;
  let fixture: ComponentFixture<DownloadSertifikatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadSertifikatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadSertifikatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
