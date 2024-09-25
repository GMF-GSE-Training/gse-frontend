import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../../../shared/service/participant.service';
import { CreateParticipant } from '../../../shared/model/participant.model';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { CompanyInputComponent } from '../../../components/input/company-input/company-input.component';
import { ParticipantFormComponent } from '../../../layouts/participant-form/participant-form.component';

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
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
        this.router.navigateByUrl(`/users/add`, {
          state: {
            no_pegawai: this.createParticipant.no_pegawai,
            nik: this.createParticipant.nik,
            email: this.createParticipant.email,
            name: this.createParticipant.nama,
            dinas: this.createParticipant.dinas
          }
        });
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
