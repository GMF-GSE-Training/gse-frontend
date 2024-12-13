import { Component } from '@angular/core';
import { CertificateFormComponent } from "../../../contents/certificate-form/certificate-form.component";

@Component({
  selector: 'app-create-sertifikat',
  standalone: true,
  imports: [
    CertificateFormComponent
],
  templateUrl: './create-sertifikat.component.html',
  styleUrl: './create-sertifikat.component.css'
})
export class CreateSertifikatComponent {

}
