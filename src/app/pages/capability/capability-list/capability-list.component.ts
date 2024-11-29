import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";
import { CapabilityService } from '../../../shared/service/capability.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { Capability } from '../../../shared/model/capability.model';

@Component({
  selector: 'app-capability-list',
  standalone: true,
  imports: [
    DataManagementComponent
],
  templateUrl: './capability-list.component.html',
  styleUrl: './capability-list.component.css'
})
export class CapabilityListComponent implements OnInit {
  pageTitle: string = "Capability";

  columns = [
    { header: 'Kode Rating', field: 'ratingCode' },
    { header: 'Kode Training', field: 'trainingCode' },
    { header: 'Nama Training', field: 'trainingName' },
    { header: 'Durasi Materi Regulasi GSE', field: 'durasiMateriRegulasGSE' },
    { header: 'Durasi Materi Kompetensi', field: 'durasiMateriRating' },
    { header: 'Total Durasi', field: 'totalDuration' },
    { header: 'Kurikulum & Silabus', field: 'kurikulumSilabus' },
    { header: 'Action', field: 'action' }
  ];

  capability: any[] = [];

  // Komponen pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  // Komponen Search
  placeHolder: string = 'Cari Capability';

  constructor(
    private capabilityService: CapabilityService,
    private router: Router,
    private route: ActivatedRoute,
    private sweetalertService: SweetalertService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['keyword'] || '';
      this.currentPage =+ params['page'] || 1;
      if (this.searchQuery) {
        this.getSearchCapability(this.searchQuery, this.currentPage, this.itemsPerPage);
      } else {
        this.getListCapability(this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListCapability(page: number, size: number): void {
    this.capabilityService.listCapability(page, size).subscribe({
      next: ({ data, actions, paging }) => {
        this.capability = data.map((capability: any) => {
          return {
            id: capability.id,
            ratingCode: capability.ratingCode,
            trainingCode: capability.trainingCode,
            trainingName: capability.trainingName,
            durasiMateriRegulasGSE: capability.totalMaterialDurationRegGse ?? "-",
            durasiMateriRating: capability.totalMaterialDurationCompetency,
            totalDuration: capability.totalDuration ?? "-",
            kurikulumSilabus: `/capability/${capability.id}/detail`,
            editLink: actions?.canEdit ? `/capability/${capability.id}/edit` : null,
            deleteMethod: actions?.canDelete ? () => this.deleteCapability(capability) : null,
          };
        });
        this.totalPages = paging?.totalPage || 1;
      },
      error: (error) => console.log(error)
    });
  }

  getSearchCapability(query: string, page: number, size: number) {
    this.capabilityService.searchCapability(query, page, size).subscribe({
      next: ({ data, actions, paging }) => {
        this.capability = data.map((capability: any) => {
          return {
            ratingCode: capability.ratingCode,
            trainingCode: capability.trainingCode,
            trainingName: capability.trainingName,
            durasiMateriRegulasGSE: capability.totalMaterialDurationRegGse,
            durasiMateriRating: capability.totalMaterialDurationCompetency,
            totalDuration: capability.totalDuration || "-",
            kurikulumSilabus: `/capability/${capability.id}/detail`,
            editLink: actions?.canEdit ? `/capability/${capability.id}/edit` : null,
            deleteMethod: actions?.canDelete ? () => this.deleteCapability(capability) : null,
          };
        });
        this.totalPages = paging?.totalPage ?? 1;
      },
      error: (error) => console.log(error)
    });
  }

  async deleteCapability(capability: Capability): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus capability ini : ${capability.trainingName}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.sweetalertService.loading('Mohon tunggu', 'Proses...');
      this.capabilityService.deleteCapability(capability.id).subscribe({
        next: () => {
          this.sweetalertService.alert('Dihapus!', 'Data capability berhasil dihapus', 'success');
          this.capability = this.capability.filter(c => c.id !== capability.id);

          if(this.capability.length === 0 && this.currentPage > 0) {
            this.currentPage -= 1;
          }

          if (this.searchQuery) {
            this.getSearchCapability(this.searchQuery, this.currentPage, this.itemsPerPage);
          } else {
            this.getListCapability(this.currentPage, this.itemsPerPage);
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
        error: () => {
          this.sweetalertService.alert('Gagal!', 'Terjadi kesalahan, coba lagi nanti', 'error');
        }
      });
    }
  }

  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.router.navigate([], {
      queryParams: { keyword: query },
      queryParamsHandling: 'merge',
    });
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
}
