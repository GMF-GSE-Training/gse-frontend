import { Component, OnInit } from '@angular/core';
import { InputDateComponent } from "../../../component/input/input-date/input-date.component";
import { InputFileComponent } from "../../../component/input/input-file/input-file.component";
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { InputCompanyComponent } from "../../../component/input/input-company/input-company.component";
import { NavbarComponent } from "../../../component/navbar/navbar.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleBasedAccessDirective } from '../../../directive/role-based-access.directive';
import { UpdateParticipantModel } from '../../../model/participant.model';
import { ParticipantService } from '../../../service/participant.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from "../../../component/alert/alert.component";
import { CommonModule } from '@angular/common';

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
    NavbarComponent,
    RouterLink,
    RoleBasedAccessDirective,
    FormsModule,
    AlertComponent,
    CommonModule,
],
  templateUrl: './edit-participant-data.component.html',
  styleUrl: './edit-participant-data.component.css'
})
export class EditParticipantDataComponent implements OnInit{
  currentParticipant: any = {
    id: '',
    no_pegawai: '',
    nama: '',
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
    gmf_non_gmf: ''
  };

  updateParticipant: Partial<UpdateParticipantModel> = {};

  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
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
      this.showAlertMessage('Tidak ada perubahan data yang perlu diperbarui');
      return;
    }

    this.participantService.updateParticipant(this.currentParticipant.id, formData).subscribe({
      next: async (response) => {
        await this.showAlertMessage('Peserta berhasil diupdate');
        this.router.navigateByUrl(`/participant/${response.data.id}/view`);
      },
      error: async (error) => {
        console.error('Error updating participant:', error.error.errors);
        await this.showAlertMessage('Gagal memperbarui peserta');
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

  showAlertMessage(message: string): Promise<void> {
    return new Promise((resolve) => {
      this.alertMessage = message;
      this.showAlert = true;
      // Resolusi ketika alert ditutup
      this.closeAlert = () => {
        this.showAlert = false;
        resolve();
      };
    });
  }


  closeAlert(): void {
    this.showAlert = false;
  }
}
