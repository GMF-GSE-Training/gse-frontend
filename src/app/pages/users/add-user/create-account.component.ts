import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { LoginRegisterComponent } from "../../../component/login-register/login-register.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { InputRoleNikComponent } from "../../../component/input/input-role-nik/input-role-nik.component";
import { CreateUserRequest } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { RoleService } from '../../../shared/service/role.service';
import { FormsModule } from '@angular/forms';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    BlueButtonComponent,
    RouterLink,
    WhiteButtonComponent,
    RoleBasedAccessDirective,
    LoginRegisterComponent,
    InputTextComponent,
    InputRoleNikComponent,
    FormsModule,
],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class AddUserComponent {
  createUser: CreateUserRequest = {
    no_pegawai: '',
    nik: '',
    email: '',
    name: '',
    password: '',
    roleId: ''
  }

  roles: any[] = [];

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private sweetalertService: SweetalertService,
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(): void {
    this.roleService.getAllRoles().subscribe(response => {
      this.roles = response.data;
    });
  }

  onRoleIdChange(roleId: string): void {
    this.createUser.roleId = roleId;
  }

  onNikChange(nik: string): void {
    this.createUser.nik = nik;
  }

  onCreate(): void {
    if (this.createUser.roleId === 'user' && !this.createUser.nik) {
      alert('NIK is required for role user.');
      return;
    }

    console.log(this.createUser)

    this.userService.createUser(this.createUser).subscribe(
      async () => {
        await this.sweetalertService.alert(true, 'Ditambahkan!', 'Pengguna berhasil ditambahkan', 'success');
      },
      error => {
        const e = error.error.errors;

        // Periksa apakah 'e' adalah objek dan bukan null
        const isObject = (obj: any) => obj !== null && typeof obj === 'object' && !Array.isArray(obj);

        // Periksa apakah 'e' adalah array
        const isArray = Array.isArray(e);
        console.log(error)

        if (isObject(e) || isArray) {
          if(e.message) {
            this.sweetalertService.alert(false, 'Gagal!', e.message, 'error');
          } else {
            if(e.email || e.name || e.password || e.roleId || e.nik) {
              this.sweetalertService.alert(false, 'Gagal!', 'field dengan tanda bintang wajib diisi dengan benar', 'error');
            }
          }
        } else {
          this.sweetalertService.alert(false, 'Gagal!', e, 'error');
        }
      }
    );
  }

  onEnterKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
    }
  }
}
