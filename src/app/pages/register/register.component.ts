import { Component, Input } from '@angular/core';
import { BlueButtonComponent } from "../../component/button/blue-button/blue-button.component";
import { LoginRegisterComponent } from "../../component/login-register/login-register.component";
import { Router, RouterLink } from '@angular/router';
import { InputTextComponent } from "../../component/input/input-text/input-text.component";
import { ApiUserService } from '../../service/user.service';
import { RegisterUserRequest } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BlueButtonComponent,
    LoginRegisterComponent,
    RouterLink,
    InputTextComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerUserRequest: RegisterUserRequest;

  constructor(
    private router: Router,
    private apiUserService: ApiUserService,
    private httpClient: HttpClientModule
  ){
    this.registerUserRequest = new RegisterUserRequest();
  }

  onRegister() {
    console.log(this.registerUserRequest);

    this.apiUserService.register(this.registerUserRequest).subscribe(response => {
      if(response.data) {
        alert('Register Berhasil');
        this.router.navigateByUrl('/home');
      } else {
        console.log(response.body.errors)
        alert('Register Gagal')
      }
    });
  }
}
