import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserRequest } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { UserFormComponent } from "../../../layouts/user-form/user-form.component";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    UserFormComponent
],
  templateUrl: './create-account.component.html',
})
export class AddUserComponent {
  createUser: CreateUserRequest = {
    noPegawai: '',
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
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (state) {
      this.createUser.noPegawai = state['noPegawai'] || '';
      this.createUser.nik = state['nik'] || '';
      this.createUser.email = state['email'] || '';
      this.createUser.name = state['name'] || '';
    }
  }

  onCreate(user: CreateUserRequest): void {
    this.cleanEmptyFields(user);

    // Periksa apakah role user dan NIK diperlukan
    if (user.roleId === 'user' && !user.nik) {
      this.sweetalertService.alert(false, 'Gagal!', 'NIK diperlukan untuk role user', 'error');
      return;
    }

    // Panggil service untuk membuat user
    this.userService.createUser(user).subscribe({
      next: () => {
        this.sweetalertService.alert(true, 'Ditambahkan!', 'Pengguna berhasil ditambahkan', 'success');
        this.router.navigateByUrl('/users');
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  private handleError(error: any): void {
    const e = error.error.errors;
    const isObject = (obj: any) => obj !== null && typeof obj === 'object' && !Array.isArray(obj);
    const isArray = Array.isArray(e);

    if (isObject(e) || isArray) {
      if (e.message) {
        this.sweetalertService.alert(false, 'Gagal!', e.message, 'error');
      } else if (e.email || e.name || e.password || e.roleId || e.nik) {
        this.sweetalertService.alert(false, 'Gagal!', 'field dengan tanda bintang wajib diisi dengan benar', 'error');
      }
    } else {
      this.sweetalertService.alert(false, 'Gagal!', e, 'error');
    }
  }

  private cleanEmptyFields(object: any): void {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === '') {
        object[key] = null;  // Atau bisa diubah menjadi undefined
      }
    }
  }
}
