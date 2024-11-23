import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserRequest, User } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { UserFormComponent } from "../../../layouts/user-form/user-form.component";
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

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
    idNumber: '',
    nik: '',
    email: '',
    name: '',
    password: '',
    roleId: ''
  }

  userId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sweetalertService: SweetalertService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.get(this.userId!).subscribe({
      next: (response) => {
        this.updateUser = {
          ...response.data as UpdateUserRequest,
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onUpdate(user: UpdateUserRequest): void {
    this.cleanEmptyFields(user);

    if(this.userId) {
      // Panggil service untuk membuat user
      this.userService.updateUser(this.userId!, user).subscribe({
        next: () => {
          this.sweetalertService.alert('Ditambahkan!', 'Pengguna berhasil diperbarui', 'success');
          this.router.navigateByUrl('/users');
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        }
      });
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
