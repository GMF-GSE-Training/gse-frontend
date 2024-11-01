import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../../../shared/service/participant.service';
import { CreateParticipant } from '../../../shared/model/participant.model';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { CompanyInputComponent } from '../../../components/input/company-input/company-input.component';
import { ParticipantFormComponent } from '../../../layouts/participant-form/participant-form.component';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

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
    simAFileName: '',
    simB: null,
    simBFileName: '',
    ktp: null,
    ktpFileName: '',
    foto: null,
    fotoFileName: '',
    suratSehatButaWarna: null,
    suratSehatButaWarnaFileName: '',
    suratBebasNarkoba: null,
    suratBebasNarkobaFileName: '',
    tglKeluarSuratSehatButaWarna: '',
    tglKeluarSuratBebasNarkoba: '',
  };

  requiredFields = ['nama', 'perusahaan', 'email', 'noTelp', 'kewarganegaraan',
                    'tempatLahir', 'tanggalLahir', 'simA', 'ktp', 'foto',
                    'suratSehatButaWarna', 'tglKeluarSuratSehatButaWarna',
                    'suratBebasNarkoba', 'tglKeluarSuratSehatBebasNarkoba'];

  constructor(
    private router: Router,
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  onCreate(participant: any) {
    const formData = this.prepareFormData(participant);

    this.participantService.createParticipant(formData).subscribe({
      next: () => {
        this.sweetalertService.alert(true, 'Ditambahkan!', 'Peserta berhasil ditambahkan', 'success');
        this.router.navigateByUrl(`/users/add`, {
          state: {
            noPegawai: this.createParticipant.noPegawai,
            nik: this.createParticipant.nik,
            email: this.createParticipant.email,
            name: this.createParticipant.nama,
            dinas: this.createParticipant.dinas
          }
        });
      },
      error: (error) => {
        this.errorHandlerService.handleError(error, this.requiredFields);
      }
    });
  }

  onFileChange(property: string, file: File | null): void {
    if (file) {
      (this.createParticipant as any)[property] = file;
      const fileNameProperty = `${property}FileName`;
      // Mengisi nama file ke property yang sesuai
      (this.createParticipant as any)[fileNameProperty] = file.name;
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
