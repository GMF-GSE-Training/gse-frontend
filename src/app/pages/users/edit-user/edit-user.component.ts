import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserRequest } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { UserFormComponent } from "../../../layouts/user-form/user-form.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    UserFormComponent
],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  updateUser: UpdateUserRequest = {
    no_pegawai: '',
    nik: '',
    email: '',
    name: '',
    password: '',
    roleId: ''
  }

  userId = this.route.snapshot.paramMap.get('id');

  roles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sweetalertService: SweetalertService,
  ) {}

  ngOnInit(): void {
    this.loadParticipant();
  }

  loadParticipant(): void {
    this.userService.get(this.userId!).subscribe({
      next: (response) => {
        this.updateUser = {
          ...response.data,
        };
      }
    });
  }

  onUpdate(user: UpdateUserRequest): void {
    this.cleanEmptyFields(user);

    // Periksa apakah role user dan NIK diperlukan
    if (user.roleId === 'user' && !user.nik) {
      alert('NIK is required for role user.');
      return;
    }

    console.log(user);

    // Panggil service untuk membuat user
    this.userService.updateUser(this.userId!, user).subscribe({
      next: async () => {
        await this.sweetalertService.alert(true, 'Ditambahkan!', 'Pengguna berhasil diperbarui', 'success');
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
    console.log(error);

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
