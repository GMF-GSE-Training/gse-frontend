import { Component } from '@angular/core';
import { NavbarComponent } from "../../../component/navbar/navbar.component";
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-download-sertifikat',
  standalone: true,
  imports: [
    NavbarComponent,
    BlueButtonComponent,
    WhiteButtonComponent,
    RouterLink,
  ],
  templateUrl: './download-sertifikat.component.html',
  styleUrl: './download-sertifikat.component.css'
})
export class DownloadSertifikatComponent {

}
