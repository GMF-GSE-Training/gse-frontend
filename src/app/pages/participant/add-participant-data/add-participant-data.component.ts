import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../elements/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../elements/button/blue-button/blue-button.component';
import { InputFileComponent } from "../../../elements/input/input-file/input-file.component";
import { InputTextComponent } from '../../../elements/input/input-text/input-text.component';
import { InputDateComponent } from "../../../elements/input/input-date/input-date.component";
import { InputCompanyComponent } from "../../../elements/input/input-company/input-company.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { ParticipantService } from '../../../shared/service/participant.service';
import { environment } from '../../../../environments/environment.development';
import { CreateParticipantModel } from '../../../shared/model/participant.model';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { TitleComponent } from "../../../components/title/title.component";

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    BlueButtonComponent,
    WhiteButtonComponent,
    InputFileComponent,
    InputTextComponent,
    InputDateComponent,
    InputCompanyComponent,
    RoleBasedAccessDirective,
    TitleComponent
],
  templateUrl: './add-participant-data.component.html',
  styleUrl: './add-participant-data.component.css'
})
export class AddParticipantDataComponent {
  @ViewChild(InputCompanyComponent) inputCompanyComponent!: InputCompanyComponent;

  createParticipant: CreateParticipantModel = {
    no_pegawai: '',
    nama: '',
    nik: '',
    dinas: '',
    bidang: '',
    perusahaan: '',
    email: '',
    no_telp: '',
    negara: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    sim_a: null,
    sim_b: null,
    ktp: null,
    foto: null,
    surat_sehat_buta_warna: null,
    surat_bebas_narkoba: null,
    exp_surat_sehat: '',
    exp_bebas_narkoba: '',
    link_qr_code: environment.link_qr_code,
    gmf_non_gmf: ''
  };

  constructor(
    private router: Router,
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
  ) {}

  onCreate() {
    const formData = new FormData();
    this.createParticipant.perusahaan = this.inputCompanyComponent.getCompanyName();

    for (const key in this.createParticipant) {
      if (this.createParticipant.hasOwnProperty(key)) {
        const value = this.createParticipant[key as keyof CreateParticipantModel];
        if (value !== '' && value !== null) {
          formData.append(key, value as any);
        }
      }
    }

    this.participantService.createParticipant(formData).subscribe({
      next: async (response) => {
        await this.sweetalertService.alert(true, 'Ditambahkan!', 'Peserta berhasil ditambahkan', 'success');
        this.router.navigateByUrl(`/participant/${response.data.id}/view`);
      },
      error: (error) => {
        const e = error.error.errors;
        console.log(e)
        this.sweetalertService.alert(false, 'Gagal!', 'Gagal menambahkan peserta', 'error');
      }
    });
  }

  onFileChange(property: keyof CreateParticipantModel, file: File | null): void {
    (this.createParticipant as any)[property] = file;
  }
}
