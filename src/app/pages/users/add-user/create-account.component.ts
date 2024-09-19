import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { Router, RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { LoginRegisterComponent } from "../../../components/login-register/login-register.component";
import { InputRoleNikComponent } from "../../../components/input/input-role-nik/input-role-nik.component";
import { CreateUserRequest } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { FormsModule } from '@angular/forms';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { TitleComponent } from "../../../components/title/title.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    BlueButtonComponent,
    RouterLink,
    WhiteButtonComponent,
    LoginRegisterComponent,
    BaseInputComponent,
    InputRoleNikComponent,
    FormsModule,
    TitleComponent
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
    private router: Router,
    private userService: UserService,
    private sweetalertService: SweetalertService,
  ) {}

  onRoleIdChange(roleId: string): void {
    this.createUser.roleId = roleId;
  }

  onNikChange(nik: string): void {
    this.createUser.nik = nik;
  }

  onCreate(): void {
    this.cleanEmptyFields(this.createUser);

    if (this.createUser.roleId === 'user' && !this.createUser.nik) {
      alert('NIK is required for role user.');
      return;
    }

    console.log(this.createUser)

    this.userService.createUser(this.createUser).subscribe(
      async () => {
        await this.sweetalertService.alert(true, 'Ditambahkan!', 'Pengguna berhasil ditambahkan', 'success');
        this.router.navigateByUrl('/users');
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

  private cleanEmptyFields(object: any): void {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === '') {
        object[key] = null;  // Atau bisa diubah menjadi undefined
      }
    }
  }

  onEnterKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
    }
  }
}
