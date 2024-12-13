import { Component } from '@angular/core';
import { HorizontalTableComponent } from '../../../components/horizontal-table/horizontal-table.component';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { DataManagementComponent } from "../../../contents/data-management/data-management.component";
import { ParticipantCotModalComponent } from "../../../components/participant-cot-modal/participant-cot-modal.component";
import { CommonModule } from '@angular/common';
import { ParticipantCotService } from '../../../shared/service/participant-cot.service';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

@Component({
  selector: 'app-cot-detail',
  standalone: true,
  imports: [
    HorizontalTableComponent,
    WhiteButtonComponent,
    DataManagementComponent,
    ParticipantCotModalComponent,
    CommonModule,
    RoleBasedAccessDirective,
],
  templateUrl: './cot-detail.component.html',
  styleUrl: './cot-detail.component.css',
})
export class CotDetailComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly participantCotService: ParticipantCotService,
    private readonly sweetalertService: SweetalertService,
    private readonly router: Router,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  cotId = this.route.snapshot.paramMap.get('id');

  leftTableData: any[] = [];
  rightTableData: any[] = [];

  columns = [
    { header: 'No Pegawai', field: 'idNumber' },
    { header: 'Nama', field: 'name' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'SIM', field: 'sim' },
    { header: 'Exp Surat Sehat & Buta Warna', field: 'expSuratSehatButaWarna' },
    { header: 'Exp Surat Bebas Narkoba', field: 'expSuratBebasNarkoba' },
    { header: 'Keterangan', field: 'keterangan' },
    { header: 'Action', field: 'action' },
  ];

  dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  participantCots: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';
  state: { data: any; } = { data: '' };

  modalColumns = [
    { header: 'No Pegawai', field: 'idNumber' },
    { header: 'Nama', field: 'name' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Bidang', field: 'bidang' },
    { header: 'Perusahaan', field: 'company' },
    { header: 'Action', field: 'action' },
  ];

  showModal: boolean = false;
  selectedParticipantIds: any[] = [];
  unregisteredParticipants: any[] = [];
  modalTotalPages: number = 0;
  modalCurrentPage: number = 1;
  modalItemsPerPage: number = 10;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['keyword'] || '';
      this.currentPage =+ params['page'] || 1;
      if(this.cotId) {
        this.getListParticipantCot(this.cotId, this.searchQuery, this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListParticipantCot(cotId: string, searchQuery: string, currentPage: number, itemsPerPage: number) {
    this.participantCotService.listParticipantCot(cotId, searchQuery, currentPage, itemsPerPage).subscribe({
      next: ({ data }) => {
        const cot = data.cot;
        const participantCot = cot.participants;
        this.leftTableData = [
          { label: 'Kode Rating', value: cot.capability.ratingCode },
          { label: 'Nama training', value: cot.capability.trainingName },
          { label: 'Tanggal Mulai', value: new Date(cot.startDate).toLocaleDateString('id-ID', this.dateOptions) },
          { label: 'Tanggal Selesai', value: new Date(cot.endDate).toLocaleDateString('id-ID', this.dateOptions) },
          { label: 'Lokasi Training', value: cot.trainingLocation },
        ];

        this.rightTableData = [
          { label: 'Instruktur Regulasi GSE', value: cot.theoryInstructorRegGse },
          { label: 'Instruktur Teori Rating', value: cot.theoryInstructorCompetency },
          { label: 'Instruktur Praktek 1', value: cot.practicalInstructor1 },
          { label: 'Instruktur Praktek 2', value: cot.practicalInstructor2 },
          { label: 'Jumlah Peserta', value: participantCot.data.length },
          { label: 'Status', value: cot.status },
        ];

        this.participantCots = participantCot.data?.map((participant: any) => {
          if (!participant) return null; // Skip jika participant null

          return {
            ...participant,
            idNumber: participant.idNumber ?? '-',
            sim: participant?.id ? `/participants/${participant.id}/${participant.simB ? 'sim-b' : 'sim-a'}` : null,
            expSuratSehatButaWarna: participant?.id ? {
              label: new Date(new Date(participant.tglKeluarSuratSehatButaWarna).setMonth(new Date(participant.tglKeluarSuratSehatButaWarna).getMonth() + 6)).toLocaleDateString('id-ID', this.dateOptions),
              value: `/participants/${participant.id}/surat-sehat-buta-warna`
            } : null,
            expSuratBebasNarkoba: participant?.id ? {
                label: new Date(new Date(participant.tglKeluarSuratBebasNarkoba).setMonth(new Date(participant.tglKeluarSuratBebasNarkoba).getMonth() + 6)).toLocaleDateString('id-ID', this.dateOptions),
                value: `/participants/${participant.id}/surat-bebas-narkoba`
            } : null,
            keterangan: '-',
            printLink: participantCot.actions?.canPrint && participant?.id ? `/sertifikat/${participant.id}` : null,
            detailLink: participantCot.actions?.canView && participant?.id ? `/participants/${participant.id}/detail` : null,
            deleteMethod: participantCot.actions?.canDelete ? () => this.deleteParticipantFromCot(data.cot.id, participant?.id) : null,
          };
        }).filter((item: null) => item !== null); // Filter out null items

        this.state.data = `/cot/${this.cotId}/detail`;
        this.totalPages = participantCot.paging.totalPage;
      },
      error: (error) => console.log(error)
    });
  }

  getUnregisteredParticipants(cotId: string, searchQuery: string, currentPage: number, itemsPerPage: number) {
    this.participantCotService.getUnregisteredParticipants(cotId, searchQuery, currentPage, itemsPerPage).subscribe({
      next: ({ paging, data }) => {
        this.modalCurrentPage = this.modalCurrentPage;
        this.modalTotalPages = paging?.totalPage ?? 1;
        // Proses data untuk mengganti nilai null dengan "-"
        this.unregisteredParticipants = data.map((item: any) => {
          // Iterasi setiap properti dari item
          return Object.fromEntries(
            Object.entries(item).map(([key, value]) => [key, value === null ? '-' : value])
          );
        });
      },
      error: (error) => console.log(error)
    })
  }

  onSearchChanged(query: string): void {
    if (query.trim() === '') {
      this.router.navigate([], {
        queryParams: { keyword: null, page: null },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        queryParams: { keyword: query, page: 1 },
        queryParamsHandling: 'merge',
      });
    }
  }

  async deleteParticipantFromCot(cotId: string, participantId: string) {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus peserta ini dari COT?`, 'warning', 'Ya, hapus!');
    if(isConfirmed) {
      this.sweetalertService.loading('Mohon tunggu', 'Proses...');
      this.participantCotService.deleteParticipantFromCot(cotId, participantId).subscribe({
        next: () => {
          this.sweetalertService.alert('Berhasil!', 'Participant berhasil dihapus dari COT ini', 'success');
          this.participantCots = this.participantCots.filter(p => p.id !== participantId);

          if(this.participantCots.length === 0 && this.currentPage > 0) {
            this.currentPage -= 1;
          }

          if(this.cotId) {
            this.getListParticipantCot(this.cotId, this.searchQuery, this.currentPage, this.itemsPerPage);
          }

          // Cek apakah halaman saat ini lebih besar dari total halaman
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages; // Pindah ke halaman sebelumnya
          }

          // Update query params dengan currentPage yang diperbarui
          const queryParams = this.searchQuery
            ? { keyword: this.searchQuery, page: this.currentPage }
            : { page: this.currentPage };

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge',
          });
        },
        error: (error) => {
          console.log(error);
          this.sweetalertService.alert('Gagal!', 'Terjadi kesalahan, silahkan coba lagi nanti', 'error');
        }
      })
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
      queryParams: { keyword: undefined, page: undefined },
      queryParamsHandling: 'merge',
    });
    this.searchQuery = '';
  }

  openModal() {
    this.showModal = true;
    if(this.cotId && this.showModal) {
      this.getUnregisteredParticipants(this.cotId, '', this.modalCurrentPage, this.modalItemsPerPage);
    }
  }

  closeModal() {
    this.selectedParticipantIds = [];
    this.showModal = false;
  }

  modalSearchChanged(searchQuery: string) {
    this.modalCurrentPage = 1;
    if(this.cotId && this.showModal) {
      this.getUnregisteredParticipants(this.cotId, searchQuery, this.modalCurrentPage, this.itemsPerPage);
    }
  }

  modalSearchCleared() {
    if(this.cotId && this.showModal) {
      this.getUnregisteredParticipants(this.cotId, '', this.modalCurrentPage, this.itemsPerPage);
    }
  }

  modalPageChanged(page: number) {
    this.modalCurrentPage = page;
    if(this.cotId && this.showModal) {
      this.getUnregisteredParticipants(this.cotId, '', this.modalCurrentPage, this.modalItemsPerPage);
    }
  }

  onSelectedIdsChange(ids: Set<number | string>) {
    this.selectedParticipantIds = Array.from(ids) as number[];
  }

  saveSelectedParticipants() {
    if(this.cotId) {
      const requestPayload = {
        participantIds: this.selectedParticipantIds
      };

      this.sweetalertService.loading('Mohon tunggu', 'Proses...');
      this.participantCotService.addParticipantToCot(this.cotId, requestPayload).subscribe({
        next: () => {
          this.sweetalertService.alert('Berhasil!', 'Berhasil menambahkan participant ke COT', 'success');
          this.closeModal();

          if(this.cotId) {
            this.getListParticipantCot(this.cotId, this.searchQuery, this.currentPage, this.itemsPerPage);
          }
        },
        error: (error) => {
          console.log(error);
          this.errorHandlerService.alertError(error);
        }
      })
    }
  }
}
