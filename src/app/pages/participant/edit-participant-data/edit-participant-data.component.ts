import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateParticipant } from '../../../shared/model/participant.model';
import { ParticipantService } from '../../../shared/service/participant.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { CompanyInputComponent } from '../../../components/input/company-input/company-input.component';
import { ParticipantFormComponent } from '../../../layouts/participant-form/participant-form.component';
import { environment } from '../../../../environments/environment.development';

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

  isUpdate: boolean = true;

  updateParticipant: UpdateParticipant = {
    noPegawai: '',
    nama: '',
    nik: '',
    dinas: '',
    bidang: '',
    perusahaan: '',
    email: '',
    noTelp: '',
    negara: '',
    tempatLahir: '',
    tanggalLahir: '',
    simA: null,
    simB: null,
    ktp: null,
    foto: null,
    suratSehatButaWarna: null,
    suratBebasNarkoba: null,
    expSuratSehatButaWarna: '',
    expSuratBebasNarkoba: '',
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
        this.updateParticipant.simAName = 'simA';
        this.updateParticipant.simBName = 'simB';
        this.updateParticipant.ktpName = 'ktp';
        this.updateParticipant.fotoName = 'foto';
        this.updateParticipant.suratSehatButaWarnaName = 'surat_sehat_buta_warna';
        this.updateParticipant.suratBebasNarkobaName = 'surat_bebas_narkoba';
        this.updateParticipant.tanggalLahir = this.formatDateToISO(response.data.tanggalLahir);
        this.updateParticipant.expSuratSehatButaWarna = this.formatDateToISO(response.data.expSuratSehatButaWarna);
        this.updateParticipant.expSuratBebasNarkoba = this.formatDateToISO(response.data.expSuratBebasNarkoba);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onUpdate(participant: any) {
    const formData = this.prepareFormData(participant);
    console.log(participant)

    this.participantService.updateParticipant(this.participantId!, formData).subscribe({
      next: (response) => {
        this.sweetalertService.alert(true, 'Diperbarui!', 'Peserta berhasil diperbarui', 'success');
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
