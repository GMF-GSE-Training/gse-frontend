import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { TableComponent } from '../../../components/table/table.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";
import { CotService } from '../../../shared/service/cot.service';
import { COT } from '../../../shared/model/cot.model';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

@Component({
  selector: 'app-cot-list',
  standalone: true,
  imports: [
    HeaderComponent,
    TableComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    RoleBasedAccessDirective,
    DataManagementComponent
],
  templateUrl: './cot-list.component.html',
  styleUrl: './cot-list.component.css',
})
export class CotListComponent {
  columns = [
    { header: 'Kode COT', field: 'kodeCot' },
    { header: 'Mulai', field: 'tanggalMulai' },
    { header: 'Selesai', field: 'tanggalSelesai' },
    { header: 'Kode Rating', field: 'kodeRating' },
    { header: 'Nama Training', field: 'namaTraining' },
    { header: 'Action', field: 'action' },
  ];

  cot: COT[] = [];

  // Komponen pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  constructor(
    private readonly cotService: CotService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly sweetalertService: SweetalertService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.currentPage =+ params['page'] || 1;
      if (this.searchQuery) {

      } else {
        this.getListCot(this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListCot(page: number, size: number): void {
    this.cotService.listCot(page, size).subscribe({
      next: ({ code, status, data, actions, paging }) => {
        if (code === 200 && status === 'OK' && Array.isArray(data)) {
          const dateOptions: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric' // Pastikan nilai-nilai ini sesuai dengan spesifikasi Intl.DateTimeFormatOptions
          };

          this.cot = data.map((cot: COT) => ({
            ...cot,
            tanggalMulai: new Date(cot.tanggalMulai).toLocaleDateString('id-ID', dateOptions),
            tanggalSelesai: new Date(cot.tanggalSelesai).toLocaleDateString('id-ID', dateOptions),
            kodeRating: cot.Capability?.kodeRating,
            namaTraining: cot.Capability?.namaTraining,
            editLink: actions?.canEdit ? `/cot/${cot.id}/edit` : null,
            detailLink: actions?.canView ? `/cot/${cot.id}/detail` : null,
            deleteMethod: actions?.canDelete ? () => this.deleteCot(cot) : null,
          }));

          this.totalPages = paging?.totalPage || 1;
        } else {
          this.cot = [];
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.cot = [];
      }
    });
  }

  async deleteCot(cot: COT): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus COT ini : ${cot.kodeCot}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.cotService.deleteCot(cot.id).subscribe({
        next: () => {
          this.sweetalertService.alert(isConfirmed, 'Dihapus!', 'Data COT berhasil dihapus', 'success');
          this.cot = this.cot.filter(c => c.id !== cot.id);
          console.log(this.cot);
        },
        error: () => {
          this.sweetalertService.alert(!isConfirmed, 'Gagal!', 'Gagal menghapus data peserta', 'error');
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
      queryParams: { q: null, page: null },
      queryParamsHandling: 'merge',
    });

    this.searchQuery = '';
  }

  onBlueButtonClick() {
    this.router.navigateByUrl('/capability/add');
  }

  onWhiteButtonClick() {
    this.router.navigateByUrl('/home');
  }
}
