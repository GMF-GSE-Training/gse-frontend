import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { DetailedViewComponent } from '../../../components/detailed-view/detailed-view.component';
import { TableComponent } from '../../../components/table/table.component';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CotService } from '../../../shared/service/cot.service';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { PaginationComponent } from "../../../components/pagination/pagination.component";
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";
import { ModalComponent } from "../../../components/modal/modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cot-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    DetailedViewComponent,
    TableComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
    PaginationComponent,
    DataManagementComponent,
    ModalComponent,
    CommonModule,
],
  templateUrl: './cot-detail.component.html',
  styleUrl: './cot-detail.component.css',
})
export class CotDetailComponent {
  searchQuery: string = '';
  searchTerm: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cotService: CotService,
    private readonly sweetalertService: SweetalertService,
    private readonly router: Router,
  ) { }

  id = this.route.snapshot.paramMap.get('id');

  leftTableData: any[] = [];
  rightTableData: any[] = [];

  columns = [
    { header: 'No Pegawai', field: 'noPegawai' },
    { header: 'Nama', field: 'nama' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'SIM', field: 'simA' },
    { header: 'Tanggal Keluar Sehat & Buta Warna', field: 'tglKeluarSuratSehatButaWarna' },
    { header: 'Tanggal Kelua Bebas Narkoba', field: 'tglKeluarSuratBebasNarkoba' },
    { header: 'Keterangan', field: 'keterangan' },
    { header: 'Action', field: 'action' },
  ];

  dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric' // Pastikan nilai-nilai ini sesuai dengan spesifikasi Intl.DateTimeFormatOptions
  };

  participantsCot: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  modalColumns = [
    { header: 'No Pegawai', field: 'noPegawai' },
    { header: 'Nama', field: 'nama' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Bidang', field: 'bidang' },
    { header: 'Perusahaan', field: 'perusahaan' },
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
      this.currentPage =+ params['page'] || 1;
      if(this.id) {
        this.getParticipantCot(this.id, this.currentPage, this.itemsPerPage);
      }
    });
  }

  getParticipantCot(cotId: string, currentPage: number, itemsPerPage: number) {
    this.cotService.getParticipantCot(cotId, currentPage, itemsPerPage).subscribe({
      next: ({ data }) => {
        console.log(data)
        this.leftTableData = [
          { label: 'Kode COT', value: data.cot.kodeCot },
          { label: 'Kode Rating', value: data.cot.Capability.kodeRating },
          { label: 'Nama training', value: data.cot.Capability.namaTraining },
          { label: 'Tanggal Mulai', value: new Date(data.cot.tanggalMulai).toLocaleDateString('id-ID', this.dateOptions) },
          { label: 'Tanggal Selesai', value: new Date(data.cot.tanggalSelesai).toLocaleDateString('id-ID', this.dateOptions) },
          { label: 'Lokasi Training', value: data.cot.lokasiTraining },
        ];

        this.rightTableData = [
          { label: 'Instruktur Regulasi GSE', value: data.cot.instrukturTeoriRegulasiGse },
          { label: 'Instruktur Teori Rating', value: data.cot.instrukturTeoriKompetensi },
          { label: 'Instruktur Praktek 1', value: data.cot.instrukturPraktek1 },
          { label: 'Instruktur Praktek 2', value: data.cot.instrukturPraktek2 },
          { label: 'Jumlah Peserta', value: data.participant.length },
          { label: 'Status', value: data.cot.status },
        ];

        this.participantsCot = data.participant?.map((participant: any) => {
          if (!participant) return null; // Skip jika participant null

          return {
            ...participant,
            simA: participant?.id ? `/participants/${participant.id}/sim-a` : null,
            tglKeluarSuratSehatButaWarna: participant?.id ? `/participants/${participant.id}/sim-a` : null,
            tglKeluarSuratBebasNarkoba: participant?.id ? `/participants/${participant.id}/sim-a` : null,
            keterangan: '-',
            printLink: data.actions?.canPrint && participant?.id ? `/sertifikat/${participant.id}` : null,
            detailLink: data.actions?.canView && participant?.id ? `/participants/${participant.id}/detail` : null,
            deleteMethod: data.actions?.canDelete ? () => this.deleteParticipantFromCot(data.cotId, participant?.id) : null,
          };
        }).filter((item: null) => item !== null); // Filter out null items

        this.totalPages = data.paging?.totalPage || 1;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getUnregisteredParticipants(cotId: string, currentPage: number, itemsPerPage: number) {
    this.cotService.getUnregisteredParticipants(cotId, currentPage, itemsPerPage).subscribe({
      next: ({ paging, data }) => {
        this.modalCurrentPage = this.modalCurrentPage;
        this.modalTotalPages = paging.totalPage;
        this.unregisteredParticipants = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSearchChanged(query: string): void {
    this.searchQuery = query; // Simpan query pencarian di properti `searchQuery`
  }


  async deleteParticipantFromCot(cotId: string, participantId: string) {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus peserta ini dari COT?`, 'warning', 'Ya, hapus!');
    if(isConfirmed) {
      this.cotService.deleteParticipantFromCot(cotId, participantId).subscribe({
        next: () => {
          this.sweetalertService.alert('Berhasil!', 'Participant berhasil dihapus dari COT ini', 'success');
          this.participantsCot = this.participantsCot.filter(p => p.id !== participantId);
        },
        error: () => {
          this.sweetalertService.alert('Gagal!', 'Gagal menhapus participant dari COT, silahkan coba lagi nanti', 'error');
        }
      })
    }
  }

  onPageChanged(page: number) {
    this.currentPage = page; // Tambahkan ini agar currentPage diperbarui
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

  openModal() {
    this.showModal = true;
    if(this.id && this.showModal) {
      this.getUnregisteredParticipants(this.id, this.modalCurrentPage, this.modalItemsPerPage);
    }
  }

  closeModal() {
    this.showModal = false;
  }

  modalSearchChanged(query: string) {
    console.log(query);
  }

  modalPageChanged(page: number) {
    this.modalCurrentPage = page;
    if(this.id && this.showModal) {
      this.getUnregisteredParticipants(this.id, this.modalCurrentPage, this.modalItemsPerPage);
    }
  }

  onSelectedIdsChange(ids: Set<number | string>) {
    this.selectedParticipantIds = Array.from(ids) as number[];
  }

  saveSelectedParticipants() {
    console.log(this.selectedParticipantIds)
    if(this.id) {
      const requestPayload = {
        participantIds: this.selectedParticipantIds
      };
      this.cotService.addParticipantToCot(this.id, requestPayload).subscribe({
        next: () => {
          this.sweetalertService.alert('Berhasil!', 'Berhasil menambahkan participant ke COT', 'success');
          this.closeModal();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
