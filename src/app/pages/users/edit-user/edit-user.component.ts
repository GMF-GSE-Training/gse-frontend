import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlueButtonComponent } from "../../../elements/button/blue-button/blue-button.component";
import { WhiteButtonComponent } from '../../../elements/button/white-button/white-button.component';
import { InputTextComponent } from "../../../elements/input/input-text/input-text.component";
import { UpdateUserRequest } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputRoleNikComponent } from "../../../elements/input/input-role-nik/input-role-nik.component";
import { TitleComponent } from "../../../components/title/title.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    RouterLink,
    BlueButtonComponent,
    WhiteButtonComponent,
    InputTextComponent,
    FormsModule,
    CommonModule,
    InputRoleNikComponent,
    TitleComponent
],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  currentUser: any = {
    no_pegawai: '',
    nik: '',
    email: '',
    name: '',
    password: '',
    roleId: ''
  }

  updateUser: UpdateUserRequest = {};
  initialUser: any = {};  // Untuk menyimpan data awal user untuk membandingkan

  constructor(
    private userService: UserService,
    private router: Router,
    private sweetalertService: SweetalertService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log(userId)
    if (userId) {
      this.userService.get(userId).subscribe({
        next: (response) => {
          console.log(response);
          this.currentUser = { ...response.data };
          this.initialUser = { ...response.data };  // Simpan data awal
        },
        error: (error) => {
          console.error('Error loading currentUser data:', error);
        }
      });
    }
  }

  onUpdate() {
    let isUpdated = false;

    if(this.updateUser) {
      // Lakukan update ke server jika ada perubahan
      this.userService.updateUser(this.initialUser.id, this.updateUser).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error loading currentUser data:', error);
        }
      });
    } else {
      this.sweetalertService.alert(false, 'Gagal!', 'tidak ada data yang diubah', 'error');
    }
  }

  onRoleIdChange(newRoleId: string): void {
    this.updateUser.roleId = newRoleId;  // Perbarui roleId berdasarkan perubahan
  }

  onNikChange(newNik: string): void {
    this.updateUser.nik = newNik;  // Perbarui nik berdasarkan perubahan
  }

  onEnterKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
    }
  }
}
