import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { TableComponent } from "../../../component/table/table.component";
import { RoleBasedAccessDirective } from '../../../directive/role-based-access.directive';
import { ParticipantService } from '../../../service/participant.service';
import { ApiResponse, Participant } from '../../../model/participant.model';
import { AlertComponent } from '../../../component/alert/alert.component';
import { ConfirmComponent } from '../../../component/confirm/confirm.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-participant-data',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent,
    AlertComponent,
    ConfirmComponent,
    RoleBasedAccessDirective,
    CommonModule,
],
  templateUrl: './view-participant-data.component.html',
  styleUrl: './view-participant-data.component.css'
})
export class ViewParticipantDataComponent implements OnInit {
  columns = [
    { header: 'No Pegawai', field: 'no_pegawai' },
    { header: 'Nama', field: 'nama' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Bidang', field: 'bidang' },
    { header: 'Perusahaan', field: 'perusahaan' },
    { header: 'Action', field: 'action' }
  ];

  showAlert: boolean = false;
  showConfirm: boolean = false;
  alertMessage: string = '';
  confirmMessage: string = '';
  participantToDelete?: Participant;

  participants: Participant[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.loadParticipants(this.currentPage, this.itemsPerPage);
  }

  loadParticipants(page: number, size: number): void {
    this.participantService.listParticipants(page, size).subscribe((response: ApiResponse) => {
      if (response.code === 200 && response.status === 'OK') {
        this.participants = response.data.map((participant: Participant) => {
          return {
            ...participant,
            editLink: `/participant/${participant.id}/edit`,
            detailLink: `/participant/${participant.id}/view`,
            deleteMethod: () => this.confirmDelete(participant)
          };
        });
        this.totalPages = response.paging.total_page;
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadParticipants(this.currentPage, this.itemsPerPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadParticipants(this.currentPage, this.itemsPerPage);
    }
  }

  confirmDelete(participant: Participant): void {
    this.participantToDelete = participant;
    this.confirmMessage = `Apakah Anda yakin ingin menghapus peserta dengan No Pegawai: ${participant.no_pegawai}?`;
    this.showConfirm = true;
  }

  onConfirmDelete(): void {
    if (this.participantToDelete) {
      this.participantService.deleteParticipant(this.participantToDelete.id).subscribe({
        next: () => {
          this.showAlertMessage('Peserta berhasil dihapus');
          this.participants = this.participants.filter(p => p.id !== this.participantToDelete!.id);
        },
        error: (err) => {
          console.error('Error deleting participant:', err);
          this.showAlertMessage('Gagal menghapus peserta.');
        }
      });
    }
    this.showConfirm = false;
  }

  onCancelDelete(): void {
    this.showConfirm = false;
  }

  showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
  }

  closeAlert(): void {
    this.showAlert = false;
  }
}
