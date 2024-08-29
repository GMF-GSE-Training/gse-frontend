import { Component } from '@angular/core';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { InputFileComponent } from "../../../component/input/input-file/input-file.component";
import { InputTextComponent } from '../../../component/input/input-text/input-text.component';
import { InputDateComponent } from "../../../component/input/input-date/input-date.component";
import { InputCompanyComponent } from "../../../component/input/input-company/input-company.component";
import { RoleBasedAccessDirective } from '../../../directive/role-based-access.directive';
import { ParticipantService } from '../../../service/participant.service';

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    BlueButtonComponent,
    WhiteButtonComponent,
    InputFileComponent,
    InputTextComponent,
    InputDateComponent,
    InputCompanyComponent,
    RoleBasedAccessDirective
],
  templateUrl: './add-participant-data.component.html',
  styleUrl: './add-participant-data.component.css'
})
export class AddParticipantDataComponent {
  createParticipant: any;

  constructor(
    private router: Router,
    private participantService: ParticipantService,
  ) {}

  onCreate() {
    this.participantService.create(this.createParticipant).subscribe({
      next: (response) => {
        alert('Peserta berhasil ditembahkan');
        this.router.navigateByUrl('/participant/view');
      },
      error: (error) => {
        const e = error.error.errors
        if (error.status === 400) {
          if(e.nik || e.email || e.name) {
            if(e.email == 'Invalid email') {
              alert('Alamat email tidak valid');
            } else {
              alert('Field dengan tanda bintang (*) wajib diisi');
            }
          } else {
            alert('NIK tidak ada di data peserta');
          }
        } else if (error.status === 401) {
          alert('Informasi login tidak valid. Silakan periksa kembali email atau nomor pegawai dan password Anda');
        } else {
          alert('Terjadi kesalahan pada server. Silakan coba lagi nanti');
        }
      }
    });
  }
}
