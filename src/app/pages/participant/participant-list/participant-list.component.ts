import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from '../../../shared/service/participant.service';
import { Participant } from '../../../shared/model/participant.model';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";

@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [
    DataManagementComponent
],
  templateUrl: './participant-list.component.html',
})
export class ParticipantListComponent implements OnInit {
  // Komponen title
  pageTitle = 'Participants';

  // Komponen tabel
  columns = [
    { header: 'No Pegawai', field: 'idNumber' },
    { header: 'Nama', field: 'name' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Bidang', field: 'bidang' },
    { header: 'Perusahaan', field: 'company' },
    { header: 'Email', field: 'email' },
    { header: 'Action', field: 'action' }
  ];

  participants: Participant[] = [];

  // Komponen pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  // Komponen Search
  placeHolder: string = 'Cari Participant';

  // Role Bassed Access
  roleBassedAccess: string[] = ['super admin', 'supervisor', 'lcu'];

  constructor(
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.currentPage =+ params['page'] || 1;
      if (this.searchQuery) {
        this.getSearchParticipants(this.searchQuery, this.currentPage, this.itemsPerPage);
      } else {
        this.getListParticipants(this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListParticipants(page: number, size: number): void {
    this.participantService.listParticipants(page, size).subscribe({
      next: (response) => {
        this.participants = (response.data as Participant[]).map((participant: Participant) => {
          return {
            ...participant,
            idNumber: participant.idNumber ?? '-',
            dinas: participant.dinas ?? '-',
            bidang: participant.bidang ?? '-',
            company: participant.company ?? '-',
            editLink: response.actions.canEdit ? `/participants/${participant.id}/edit` : null,
            detailLink: response.actions.canView ? `/participants/${participant.id}/detail` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteParticipant(participant) : null,
          };
        });
        this.totalPages = response.paging.totalPage;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async deleteParticipant(participant: Participant): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus peserta ini : ${participant.name}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.participantService.deleteParticipant(participant.id).subscribe({
        next: () => {
          this.sweetalertService.alert('Dihapus!', 'Data peserta berhasil dihapus', 'success');
          this.participants = this.participants.filter(p => p.id !== participant.id);
        },
        error: () => {
          this.sweetalertService.alert('Gagal!', 'Gagal menghapus data peserta', 'error');
        }
      });
    }
  }

  getSearchParticipants(query: string, page: number, size: number) {
    this.participantService.searchParticipant(query, page, size).subscribe({
      next: (response) => {
        this.participants = (response.data as Participant[]).map((participant: Participant) => {
          return {
            ...participant,
            idNumber: participant.idNumber ?? '-',
            dinas: participant.dinas ?? '-',
            bidang: participant.bidang ?? '-',
            company: participant.company ?? '-',
            editLink: response.actions.canEdit ? `/participants/${participant.id}/edit` : null,
            detailLink: response.actions.canView ? `/participants/${participant.id}/detail` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteParticipant(participant) : null,
          };
        });
        this.totalPages = response.paging.totalPage;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.participants = [];
      }
    });
  }

  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.router.navigate([], {
      queryParams: { search: query },
      queryParamsHandling: 'merge',
    });
    this.getSearchParticipants(query, 1, this.itemsPerPage);
  }

  onPageChanged(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  viewAll(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: null, page: null },
      queryParamsHandling: 'merge',
    });

    this.searchQuery = '';
  }
}
