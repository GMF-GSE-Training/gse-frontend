import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EditSignComponent } from './edit-sign.component';

describe('EditSignComponent', () => {
  let component: EditSignComponent;
  let fixture: ComponentFixture<EditSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSignComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
