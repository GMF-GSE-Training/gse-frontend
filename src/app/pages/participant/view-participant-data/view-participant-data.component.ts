import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ParticipantService } from '../../../shared/service/participant.service';
import { ListParticipantsResponse, Participant } from '../../../shared/model/participant.model';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { FormsModule } from '@angular/forms';
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";

@Component({
  selector: 'app-view-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    DataManagementComponent
],
  templateUrl: './view-participant-data.component.html',
})
export class ViewParticipantDataComponent implements OnInit {
  // Komponen title
  pageTitle = 'View Participant Data';

  // Komponen tabel
  columns = [
    { header: 'No Pegawai', field: 'no_pegawai' },
    { header: 'Nama', field: 'nama' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Bidang', field: 'bidang' },
    { header: 'Perusahaan', field: 'perusahaan' },
    { header: 'Action', field: 'action' }
  ];

  participants: Participant[] = [];

  // Komponen pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  // Komponen Search
  placeHolder: string = 'Search Participant';

  // Role Bassed Access
  roleBassedAccess: string[] = ['super admin'];

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
    this.participantService.listParticipants(page, size).subscribe((response: ListParticipantsResponse) => {
      if (response.code === 200 && response.status === 'OK') {
        console.log('List Response', response)
        this.participants = response.data.map((participant: Participant) => {
          return {
            ...participant,
            no_pegawai: participant.no_pegawai ?? '-',
            dinas: participant.dinas ?? '-',
            bidang: participant.bidang ?? '-',
            editLink: response.actions.canEdit ? `/participants/${participant.id}/edit` : null,
            detailLink: response.actions.canView ? `/participants/${participant.id}/view` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteParticipant(participant) : null,
          };
        });
        this.totalPages = response.paging.total_page;
      } else {
        this.participants = [];
      }
    });
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

  getSearchParticipants(query: string, page: number, size: number) {
    this.participantService.searchParticipant(query, page, size).subscribe((response: ListParticipantsResponse) => {
      if (response.code === 200 && response.status === 'OK') {
        console.log('Search Response', response);
        this.participants = response.data.map((participant: Participant) => {
          return {
            ...participant,
            no_pegawai: participant.no_pegawai ?? '-',
            dinas: participant.dinas ?? '-',
            bidang: participant.bidang ?? '-',
            editLink: response.actions.canEdit ? `/participants/${participant.id}/edit` : null,
            detailLink: response.actions.canView ? `/participants/${participant.id}/view` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteParticipant(participant) : null,
          };
        });
        this.totalPages = response.paging.total_page;
      } else {
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

  onBlueButtonClick() {
    this.router.navigateByUrl('/participants/add');
  }

  onWhiteButtonClick() {
    this.router.navigateByUrl('/home');
  }
}
