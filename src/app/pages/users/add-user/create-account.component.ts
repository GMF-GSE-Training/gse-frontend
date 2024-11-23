import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserRequest } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { UserFormComponent } from "../../../layouts/user-form/user-form.component";
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

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
    participantId: '',
    idNumber: '',
    nik: '',
    email: '',
    name: '',
    password: '',
    roleId: ''
  }

  requiredFields = ['name', 'nik', 'email', 'roleId', 'password'];
  initialRole: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private sweetalertService: SweetalertService,
    private errorHandlerService: ErrorHandlerService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (state) {
      this.createUser.participantId = state['id'];
      this.createUser.idNumber = state['idNumber'] || '';
      this.createUser.nik = state['nik'] || '';
      this.createUser.email = state['email'] || '';
      this.createUser.name = state['name'] || '';
      this.createUser.dinas = state['dinas'] || '';
      this.initialRole = 'user';
    }
  }

  onCreate(user: CreateUserRequest): void {
    this.cleanEmptyFields(user);

    // Panggil service untuk membuat user
    this.userService.createUser(user).subscribe({
      next: () => {
        this.sweetalertService.alert('Ditambahkan!', 'Pengguna berhasil ditambahkan', 'success');
        this.router.navigateByUrl('/users');
      },
      error: (error) => {
        this.errorHandlerService.handleError(error, this.requiredFields);
      }
    });
  }

  private cleanEmptyFields(object: any): void {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === '') {
        object[key] = null;  // Atau bisa diubah menjadi undefined
      }
    }
  }
}
