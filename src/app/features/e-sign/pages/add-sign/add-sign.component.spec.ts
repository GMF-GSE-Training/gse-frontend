import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Added

import { AddSignComponent } from './add-sign.component';

describe('AddSignComponent', () => {
  let component: AddSignComponent;
  let fixture: ComponentFixture<AddSignComponent>;

  beforeEach(async () => {
    // Mock localStorage
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user_profile') {
        return JSON.stringify({ role: { name: 'Admin' } });
      }
      return null;
    });
    spyOn(window.localStorage, 'setItem');
    spyOn(window.localStorage, 'removeItem');

    await TestBed.configureTestingModule({
      imports: [
        AddSignComponent, 
        HttpClientTestingModule,
        RouterTestingModule // Added
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
