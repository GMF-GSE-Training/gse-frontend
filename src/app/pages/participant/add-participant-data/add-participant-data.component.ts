import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../../../shared/service/participant.service';
import { CreateParticipant, Participant } from '../../../shared/model/participant.model';
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
    idNumber: '',
    name: '',
    nik: '',
    dinas: '',
    bidang: '',
    company: '',
    email: '',
    phoneNumber: '',
    nationality: '',
    placeOfBirth: '',
    dateOfBirth: '',
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
    qrCodeLink: ''
  };

  requiredFields = ['name', 'company', 'email', 'phoneNumber', 'kewarganegaraan',
                    'placeOfBirth', 'dateOfBirth', 'simA', 'ktp', 'foto',
                    'suratSehatButaWarna', 'tglKeluarSuratSehatButaWarna',
                    'suratBebasNarkoba', 'tglKeluarSuratSehatBebasNarkoba'];

  constructor(
    private router: Router,
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  onCreate(participant: any) {
    participant.qrCodeLink = environment.qrCodeLink;
    const formData = this.prepareFormData(participant);

    this.participantService.createParticipant(formData).subscribe({
      next: (response) => {
        const responseData = response.data as Participant;
        this.sweetalertService.alert('Ditambahkan!', 'Peserta berhasil ditambahkan', 'success');
        this.router.navigateByUrl(`/users/add`, {
          state: {
            id: responseData.id,
            idNumber: responseData.idNumber,
            nik: responseData.nik,
            email: responseData.email,
            name: responseData.name,
            dinas: responseData.dinas
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
      // Mengisi name file ke property yang sesuai
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
