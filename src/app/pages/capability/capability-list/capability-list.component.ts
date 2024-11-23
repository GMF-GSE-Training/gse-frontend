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
      this.searchQuery = params['q'] || '';
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
      next: (response: any) => {
        this.capability = response.data.map((capability: any) => {
          const totalDurasiRegulasiGSE = capability.totalTheoryDurationRegGse + capability.totalPracticeDurationRegGse || '-';

          const totalDurasiKompetensi = capability.totalTheoryDurationCompetency + capability.totalPracticeDurationCompetency || '-';

          return {
            id: capability.id,
            ratingCode: capability.ratingCode,
            trainingCode: capability.trainingCode,
            trainingName: capability.trainingName,
            durasiMateriRegulasGSE: totalDurasiRegulasiGSE ?? '-',
            durasiMateriRating: totalDurasiKompetensi ?? '-',
            totalDuration: capability.totalDuration || "-",
            kurikulumSilabus: `/capability/${capability.id}/detail`,
            editLink: response.actions.canEdit ? `/capability/${capability.id}/edit` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteCapability(capability) : null,
          };
        });
        this.totalPages = response.paging.totalPage;
      },
      error: (error) => {
        console.log(error)
        this.capability = [];
      }
    });
  }

  async deleteCapability(capability: Capability): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus capability ini : ${capability.trainingName}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.capabilityService.deleteCapability(capability.id).subscribe({
        next: () => {
          this.sweetalertService.alert('Dihapus!', 'Data capability berhasil dihapus', 'success');
          this.capability = this.capability.filter(c => c.id !== capability.id);
        },
        error: () => {
          this.sweetalertService.alert('Gagal!', 'Gagal menghapus data capability', 'error');
        }
      });
    }
  }

  async getSearchCapability(query: string, page: number, size: number) {
    this.capabilityService.searchCapability(query, page, size).subscribe({
      next: (response) => {
        this.capability = (response.data as Capability[]).map((capability: any) => {
          const totalDurasiRegulasiGSE = capability.totalTheoryDurationRegGse + capability.totalPracticeDurationRegGse || '-';
          const totalDurasiKompetensi = capability.totalTheoryDurationCompetency + capability.totalPracticeDurationCompetency || '-';

          return {
            ratingCode: capability.ratingCode,
            trainingCode: capability.trainingCode,
            trainingName: capability.trainingName,
            durasiMateriRegulasGSE: totalDurasiRegulasiGSE,
            durasiMateriRating: totalDurasiKompetensi,
            totalDuration: capability.totalDuration || "-",
            kurikulumSilabus: `/capability/${capability.id}/detail`,
            editLink: response.actions.canEdit ? `/capability/${capability.id}/edit` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteCapability(capability) : null,
          };
        });
        this.totalPages = response.paging.totalPage;
      },
      error: (error) => {
        console.log(error);
        this.capability = [];
      }
    });
  }

  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.router.navigate([], {
      queryParams: { search: query },
      queryParamsHandling: 'merge',
    });
    this.getSearchCapability(query, 1, this.itemsPerPage);
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
