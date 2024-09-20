import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateParticipant } from '../../../shared/model/participant.model';
import { ParticipantService } from '../../../shared/service/participant.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { CompanyInputComponent } from '../../../components/input/company-input/company-input.component';
import { ParticipantFormComponent } from '../../../layouts/participant-form/participant-form.component';

@Component({
  selector: 'app-edit-participant-data',
  standalone: true,
  imports: [
    ParticipantFormComponent,
],
  templateUrl: './edit-participant-data.component.html',
})
export class EditParticipantDataComponent implements OnInit {
  @ViewChild(CompanyInputComponent) companyInputComponent!: CompanyInputComponent;

  updateParticipant: UpdateParticipant = {
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

  participantId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
  ) {
  }

  ngOnInit(): void {
    this.loadParticipant();
  }

  loadParticipant(): void {
    this.participantService.getParticipantById(this.participantId!).subscribe({
      next: (response) => {
        this.updateParticipant = response.data;
        this.updateParticipant.sim_a = 'sim_a';
        this.updateParticipant.sim_b = 'sim_b';
        this.updateParticipant.ktp = 'ktp';
        this.updateParticipant.foto = 'foto';
        this.updateParticipant.surat_sehat_buta_warna = 'surat_sehat_buta_warna';
        this.updateParticipant.surat_bebas_narkoba = 'surat_bebas_narkoba';
        this.updateParticipant.tanggal_lahir = this.formatDateToISO(response.data.tanggal_lahir);
        this.updateParticipant.exp_surat_sehat = this.formatDateToISO(response.data.exp_surat_sehat);
        this.updateParticipant.exp_bebas_narkoba = this.formatDateToISO(response.data.exp_bebas_narkoba);
      }
    });
  }

  onUpdate(participant: any) {
    const formData = this.prepareFormData(participant);

    this.participantService.updateParticipant(this.participantId!, formData).subscribe({
      next: async (response) => {
        await this.sweetalertService.alert(true, 'Diperbarui!', 'Peserta berhasil diperbarui', 'success');
        this.router.navigateByUrl(`/participants/${response.data.id}/view`);
      },
      error: (error) => {
        console.log(error.error.errors);
        this.sweetalertService.alert(false, 'Gagal!', 'Gagal memperbarui peserta', 'error');
      }
    });
  }

  onFileChange(property: string, file: File | null): void {
    if (file) {
      (this.updateParticipant as any)[property] = file;
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

  private formatDateToISO(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
}
