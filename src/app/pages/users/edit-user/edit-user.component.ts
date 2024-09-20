import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { UpdateUserRequest } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputRoleNikComponent } from "../../../components/input/input-role-nik/input-role-nik.component";
import { TitleComponent } from "../../../components/title/title.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { UserFormComponent } from "../../../layouts/user-form/user-form.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    UserFormComponent
],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
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
