import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { TableComponent } from "../../../component/table/table.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { ParticipantService } from '../../../shared/service/participant.service';
import { ApiResponse, Participant } from '../../../shared/model/participant.model';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-view-participant-data',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent,
    RoleBasedAccessDirective,
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

  participants: Participant[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
  ) {}

  ngOnInit(): void {
    this.loadParticipants(this.currentPage, this.itemsPerPage);
  }

  loadParticipants(page: number, size: number): void {
    this.participantService.listParticipants(page, size).subscribe((response: ApiResponse) => {
      if (response.code === 200 && response.status === 'OK') {
        this.participants = response.data.map((participant: Participant) => {
          return {
            ...participant,
            no_pegawai: participant.no_pegawai ?? '-',
            dinas: participant.dinas ?? '-',
            bidang: participant.bidang ?? '-',
            editLink: `/participant/${participant.id}/edit`,
            detailLink: `/participant/${participant.id}/view`,
            deleteMethod: () => this.deleteParticipant(participant)
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

  async deleteParticipant(participant: Participant): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus peserta ini : ${participant.nama}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.participantService.deleteParticipant(participant.id).subscribe({
        next: () => {
          this.sweetalertService.alert(isConfirmed, 'Dihapus!', 'Data peserta berhasil dihapus', 'success');
          this.participants = this.participants.filter(p => p.id !== participant.id);
        },
        error: () => {
          this.sweetalertService.alert(!isConfirmed, 'Gagal!', 'Gagal menghapus data peserta', 'error');
        }
      });
    }
  }
}
