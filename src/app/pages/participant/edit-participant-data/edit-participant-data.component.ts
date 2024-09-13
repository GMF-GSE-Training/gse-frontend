import { Component, OnInit, ViewChild } from '@angular/core';
import { InputDateComponent } from "../../../elements/input/input-date/input-date.component";
import { InputFileComponent } from "../../../elements/input/input-file/input-file.component";
import { WhiteButtonComponent } from "../../../elements/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../elements/button/blue-button/blue-button.component";
import { InputTextComponent } from "../../../elements/input/input-text/input-text.component";
import { InputCompanyComponent } from "../../../elements/input/input-company/input-company.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UpdateParticipantModel } from '../../../shared/model/participant.model';
import { ParticipantService } from '../../../shared/service/participant.service';
import { FormsModule } from '@angular/forms';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { TitleComponent } from "../../../components/title/title.component";

@Component({
  selector: 'app-edit-participant-data',
  standalone: true,
  imports: [
    InputDateComponent,
    InputFileComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    InputTextComponent,
    InputCompanyComponent,
    HeaderComponent,
    RouterLink,
    FormsModule,
    TitleComponent
],
  templateUrl: './edit-participant-data.component.html',
  styleUrl: './edit-participant-data.component.css'
})
export class EditParticipantDataComponent implements OnInit{
  @ViewChild(InputCompanyComponent) inputCompanyComponent!: InputCompanyComponent;

  currentParticipant: any = {
    id: '',
    no_pegawai: null,
    nama: '',
    nik: '',
    dinas: null,
    bidang: null,
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
    gmf_non_gmf: ''
  };

  updateParticipant: Partial<UpdateParticipantModel> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
  ) {}

  ngOnInit() {
    const participantId = this.route.snapshot.paramMap.get('id');
    if (participantId) {
      this.participantService.getParticipantById(participantId).subscribe({
        next: (response) => {
          this.currentParticipant = {
            ...response.data,
            tanggal_lahir: this.convertToDateFormat(response.data.tanggal_lahir),
            exp_bebas_narkoba: this.convertToDateFormat(response.data.exp_bebas_narkoba),
            exp_surat_sehat: this.convertToDateFormat(response.data.exp_surat_sehat)
          };
          if(!this.currentParticipant.perusahaan.toLowerCase().includes('gmf')) {
            this.inputCompanyComponent.selectedCompany = 'Non GMF';
            this.inputCompanyComponent.showCompanyInput = true
            this.inputCompanyComponent.companyName = this.currentParticipant.perusahaan;
          }
        },
        error: (error) => {
          console.error('Error loading currentParticipant data:', error);
        }
      });
    }
  }

  onUpdate() {
    const formData = new FormData();
    let isUpdated = false;

    this.currentParticipant.no_pegawai === '' ? this.updateParticipant.no_pegawai = "null" : this.updateParticipant;
    this.currentParticipant.dinas === '' ? this.updateParticipant.dinas = "null" : this.updateParticipant;
    this.currentParticipant.bidang === '' ? this.updateParticipant.bidang = "null" : this.updateParticipant;

    if(this.currentParticipant.perusahaan !== this.inputCompanyComponent.getCompanyName() && this.inputCompanyComponent.getCompanyName() !== '') {
      this.updateParticipant.perusahaan = this.inputCompanyComponent.getCompanyName();
    }

    // Menambahkan hanya data yang berubah ke FormData
    for (const key in this.updateParticipant) {
      if (this.updateParticipant) {
        isUpdated = true; // Ada perubahan data
        const value = this.updateParticipant[key as keyof UpdateParticipantModel];
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value as any);
        }
      }
    }

    if (!isUpdated) {
      this.sweetalertService.alert(true, 'Diperbarui!', 'Gagal memperbarui data peserta, tidak ada data yang diubah', 'error');
      return;
    }

    this.participantService.updateParticipant(this.currentParticipant.id, formData).subscribe({
      next: async (response) => {
        await this.sweetalertService.alert(true, 'Diperbarui!', 'Data peserta berhasil diperbarui', 'success');
        this.router.navigateByUrl(`/participants/${response.data.id}/view`);
      },
      error: (error) => {
        console.error('Error updating participant:', error.error.errors);
        this.sweetalertService.alert(false, 'Gagal!', 'Gagal memperbarui data peserta', 'error');
      }
    });
  }

  onFileChange(property: keyof UpdateParticipantModel, file: File | null): void {
    if (file) {
      (this.updateParticipant as any)[property] = file;
    }
  }

  onDateChange(date: string): void {
    this.updateParticipant.tanggal_lahir = date;
  }

  convertToDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
}
