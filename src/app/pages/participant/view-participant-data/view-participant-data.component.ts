import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { TableComponent } from "../../../component/table/table.component";
import { RoleBasedAccessDirective } from '../../../directive/role-based-access.directive';
import { ParticipantService } from '../../../service/participant.service';
import { ApiResponse, Participant } from '../../../model/participant.model';

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

  deleteParticipant(participant: Participant): void {
    if (confirm(`Are you sure you want to delete participant with id: ${participant.no_pegawai}?`)) {
      this.participantService.deleteParticipant(participant.id).subscribe({
        next: () => {
          alert('Participant deleted successfully.');
          this.participants = this.participants.filter(p => p.id !== participant.id);
        },
        error: (err) => {
          console.error('Error deleting participant:', err);
          alert('Failed to delete participant.');
        }
      });
    } else {
      alert('Failed to delete participant.');
    }
  }
}
