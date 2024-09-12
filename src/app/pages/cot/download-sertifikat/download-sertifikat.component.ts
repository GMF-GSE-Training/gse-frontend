import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { BlueButtonComponent } from "../../../elements/button/blue-button/blue-button.component";
import { WhiteButtonComponent } from "../../../elements/button/white-button/white-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-download-sertifikat',
  standalone: true,
  imports: [
    HeaderComponent,
    BlueButtonComponent,
    WhiteButtonComponent,
    RouterLink,
  ],
  templateUrl: './download-sertifikat.component.html',
  styleUrl: './download-sertifikat.component.css'
})
export class DownloadSertifikatComponent {

}
