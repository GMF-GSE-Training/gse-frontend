import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";
import { CotService } from '../../../shared/service/cot.service';
import { Cot } from '../../../shared/model/cot.model';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-cot-list',
  standalone: true,
  imports: [
    DataManagementComponent
],
  templateUrl: './cot-list.component.html',
  styleUrl: './cot-list.component.css',
})
export class CotListComponent {
  columns = [
    { header: 'Mulai', field: 'startDate' },
    { header: 'Selesai', field: 'endDate' },
    { header: 'Kode Rating', field: 'ratingCode' },
    { header: 'Nama Training', field: 'trainingName' },
    { header: 'Action', field: 'action' },
  ];

  cot: any[] = [];

  // Komponen pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric' // Pastikan nilai-nilai ini sesuai dengan spesifikasi Intl.DateTimeFormatOptions
  };

  constructor(
    private readonly cotService: CotService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly sweetalertService: SweetalertService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.currentPage =+ params['page'] || 1;
      if (this.searchQuery) {
        this.getSearchCot(this.searchQuery, this.currentPage, this.itemsPerPage);
      } else {
        this.getListCot(this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListCot(page: number, size: number): void {
    this.cotService.listCot(page, size).subscribe({
      next: ({ code, status, data, actions, paging }) => {
        this.cot = (data as Cot[]).map((cot) => ({
          startDate: new Date(cot.startDate).toLocaleDateString('id-ID', this.dateOptions),
          endDate: new Date(cot.endDate).toLocaleDateString('id-ID', this.dateOptions),
          ratingCode: cot.Capability?.ratingCode,
          trainingName: cot.Capability?.trainingName,
          editLink: actions?.canEdit ? `/cot/${cot.id}/edit` : null,
          detailLink: actions?.canView ? `/cot/${cot.id}/detail` : null,
          deleteMethod: actions?.canDelete ? () => this.deleteCot(cot) : null,
        }));

        this.totalPages = paging.totalPage;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  async deleteCot(cot: Cot): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus COT ${cot.Capability.trainingName}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.cotService.deleteCot(cot.id).subscribe({
        next: () => {
          this.sweetalertService.alert('Dihapus!', 'Data COT berhasil dihapus', 'success');
          this.cot = this.cot.filter(c => c.id !== cot.id);
        },
        error: () => {
          this.sweetalertService.alert('Gagal!', 'Gagal menghapus data peserta', 'error');
        }
      });
    }
  }

  getSearchCot(query: string, page: number, size: number) {
    this.cotService.searchCot(query, page, size).subscribe({
      next: ({ code, status, data, actions, paging }) => {
        if (code === 200 && status === 'OK' && Array.isArray(data)) {
          this.cot = data.map((cot: Cot) => ({
            ...cot,
            startDate: new Date(cot.startDate).toLocaleDateString('id-ID', this.dateOptions),
            endDate: new Date(cot.endDate).toLocaleDateString('id-ID', this.dateOptions),
            ratingCode: cot.Capability?.ratingCode,
            trainingName: cot.Capability?.trainingName,
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

  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.router.navigate([], {
      queryParams: { search: query },
      queryParamsHandling: 'merge',
    });
    this.getSearchCot(query, 1, this.itemsPerPage);
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
