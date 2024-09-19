import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRoleNikComponent } from './input-role-nik.component';

describe('InputRoleNikComponent', () => {
  let component: InputRoleNikComponent;
  let fixture: ComponentFixture<InputRoleNikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRoleNikComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputRoleNikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
