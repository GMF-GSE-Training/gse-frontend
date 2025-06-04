import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DataManagementComponent } from './data-management.component';
import { RoleBasedAccessDirective } from '../../directive/role-based-access.directive';

describe('DataManagementComponent', () => {
  let component: DataManagementComponent;
  let fixture: ComponentFixture<DataManagementComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [DataManagementComponent, RouterTestingModule, RoleBasedAccessDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataManagementComponent);
    component = fixture.componentInstance;

    // Mock localStorage
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user_profile') {
        return JSON.stringify({ role: { name: 'Admin' } }); // Sesuai format yang diharapkan
      }
      return null;
    });
    spyOn(window.localStorage, 'setItem'); // Tambahkan spy untuk setItem jika diperlukan
    spyOn(window.localStorage, 'removeItem'); // Tambahkan spy untuk removeItem jika diperlukan

    fixture.detectChanges();
    tick(); // Jalankan operasi asinkron jika ada
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
