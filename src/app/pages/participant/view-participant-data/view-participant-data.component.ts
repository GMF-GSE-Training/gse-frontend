import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ParticipantService } from '../../../shared/service/participant.service';
import { ApiResponse, Participant } from '../../../shared/model/participant.model';
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
  styleUrl: './view-participant-data.component.css'
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

  constructor(
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.currentPage = +params['page'] || 1;
      this.loadParticipants(this.currentPage, this.itemsPerPage);
    });
  }

  loadParticipants(page: number, size: number): void {
    if (this.searchQuery) {
      this.participantService.searchParticipant(this.searchQuery, page, size).subscribe((response: ApiResponse) => {
        if (response.code === 200 && response.status === 'OK') {
          console.log(response);
          this.participants = response.data.map((participant: Participant) => {
            return {
              ...participant,
              no_pegawai: participant.no_pegawai ?? '-',
              dinas: participant.dinas ?? '-',
              bidang: participant.bidang ?? '-',
              editLink: `/participants/${participant.id}/edit`,
              detailLink: `/participants/${participant.id}/view`,
              deleteMethod: () => this.deleteParticipant(participant)
            };
          });
          this.totalPages = response.paging.total_page;
        } else {
          this.participants = [];
        }
      });
    } else {
      this.participantService.listParticipants(page, size).subscribe((response: ApiResponse) => {
        if (response.code === 200 && response.status === 'OK') {
          this.participants = response.data.map((participant: Participant) => {
            return {
              ...participant,
              no_pegawai: participant.no_pegawai ?? '-',
              dinas: participant.dinas ?? '-',
              bidang: participant.bidang ?? '-',
              editLink: `/participants/${participant.id}/edit`,
              detailLink: `/participants/${participant.id}/view`,
              deleteMethod: () => this.deleteParticipant(participant)
            };
          });
          this.totalPages = response.paging.total_page;
        } else {
          this.participants = [];
        }
      });
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

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: this.searchQuery, page: 1 }, // Update URL dengan query parameter
        queryParamsHandling: 'merge', // Pertahankan parameter lain yang ada
      });

      this.participantService.searchParticipant(this.searchQuery, this.currentPage, this.itemsPerPage).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.code === 200 && response.status === 'OK') {this.columns
            this.participants = response.data;
            this.totalPages = response.paging.total_page;
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { search: this.searchQuery, page: 1 },
              queryParamsHandling: 'merge',
            })
          } else {
            this.participants = []; // Kosongkan tabel jika tidak ada hasil
            this.totalPages = 1; // Reset jumlah halaman
            this.sweetalertService.alert(false, 'Tidak ditemukan!', 'Peserta tidak ditemukan.', 'warning');
          }
        },
        error: () => {
          this.participants = []; // Kosongkan tabel jika terjadi error
          this.totalPages = 1; // Reset jumlah halaman
          this.sweetalertService.alert(false, 'Gagal!', 'Terjadi kesalahan saat mencari peserta.', 'error');
        }
      });
    }
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
      queryParams: { search: null, page: 1 },
      queryParamsHandling: 'merge',
    });

    this.searchQuery = '';
    this.loadParticipants(1, this.itemsPerPage);
  }
}
