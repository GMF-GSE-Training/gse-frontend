import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { ParticipantService } from '../../../shared/service/participant.service';
import { TitleComponent } from "../../../components/title/title.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { CreateParticipant, ParticipantResponse } from '../../../shared/model/participant.model';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { CompanyInputComponent } from '../../../components/input/company-input/company-input.component';
import { FileInputComponent } from '../../../components/input/file-input/file-input.component';
import { ParticipantFormComponent } from '../../../layouts/participant-form/participant-form.component';

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    BlueButtonComponent,
    WhiteButtonComponent,
    BaseInputComponent,
    FileInputComponent,
    CompanyInputComponent,
    TitleComponent,
    BaseInputComponent,
    FormsModule,
    ParticipantFormComponent,
  ],
  templateUrl: './add-participant-data.component.html',
})
export class AddParticipantDataComponent {

  @ViewChild(CompanyInputComponent) companyInputComponent!: CompanyInputComponent;

  createParticipant: CreateParticipant = {
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

  onCreate(participant: any) {
    const formData = this.prepareFormData(participant);

    this.participantService.createParticipant(formData).subscribe({
      next: async (response) => {
        await this.sweetalertService.alert(true, 'Ditambahkan!', 'Peserta berhasil ditambahkan', 'success');
        this.router.navigateByUrl(`/participants/${response.data.id}/view`);
      },
      error: (error) => {
        console.log(error.error.errors);
        this.sweetalertService.alert(false, 'Gagal!', 'Gagal menambahkan peserta', 'error');
      }
    });
  }

  onFileChange(property: string, file: File | null): void {
    if (file) {
      (this.createParticipant as any)[property] = file;
    }
  }

  private prepareFormData(participant: any): FormData {
    const formData = new FormData();
    for (const key in participant) {
      if (participant.hasOwnProperty(key)) {
        const value = participant[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      }
    }
    return formData;
  }
}
