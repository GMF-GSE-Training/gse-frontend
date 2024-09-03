import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { TableComponent } from "../../../component/table/table.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { ParticipantService } from '../../../shared/service/participant.service';
import { ApiResponse, Participant } from '../../../shared/model/participant.model';
import Swal from 'sweetalert2';

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
    const isConfirmed = await this.confirm('Anda Yakin?', `Apakah anda ingin menghapus peserta ini : ${participant.nama}?`);
    if (isConfirmed) {
      this.participantService.deleteParticipant(participant.id).subscribe({
        next: () => {
          this.alert(isConfirmed);
          this.participants = this.participants.filter(p => p.id !== participant.id);
        },
        error: () => {
          this.alert(!isConfirmed);
        }
      });
    }
  }

  async confirm(title: string, message: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#02507E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak",
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  async alert(isConfirmed: boolean) {
    if (isConfirmed) {
      Swal.fire({
        title: "Dihapus!",
        text: "Data peserta berhasil dihapus",
        icon: "success",
        confirmButtonColor: "#02507E",
      });
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Gagal menghapus data peserta",
        icon: "error",
        confirmButtonColor: "#02507E",
      });
    }
  }
}
