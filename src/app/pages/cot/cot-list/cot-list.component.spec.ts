import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCotComponent } from './cot-list.component';

describe('ViewCotComponent', () => {
  let component: ViewCotComponent;
  let fixture: ComponentFixture<ViewCotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
