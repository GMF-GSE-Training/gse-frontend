import { Component } from '@angular/core';
import { BlueButtonComponent } from '../../component/button/blue-button/blue-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BlueButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
