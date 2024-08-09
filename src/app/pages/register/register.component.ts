import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../component/button/blue-button/blue-button.component";
import { LoginRegisterComponent } from "../../component/login-register/login-register.component";
import { RouterLink } from '@angular/router';
import { InputTextComponent } from "../../component/input/input-text/input-text.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BlueButtonComponent,
    LoginRegisterComponent,
    RouterLink,
    InputTextComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
