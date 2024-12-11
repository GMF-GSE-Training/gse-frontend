import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";
import { ESign } from '../../../shared/model/e-sign.model';
import { ESignService } from '../../../shared/service/e-sign.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-sign-list',
  standalone: true,
  imports: [
    DataManagementComponent
],
  templateUrl: './signature-list.component.html',
  styleUrl: './signature-list.component.css'
})
export class SignatureListComponent {
  constructor(
    private eSignService: ESignService,
    private sweetalertService: SweetalertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  columns = [
    { header: 'No Pegawai', field: 'noPegawai' },
    { header: 'Role', field: 'role' },
    { header: 'Nama', field: 'name' },
    { header: 'Tanda Tangan', field: 'tandaTangan' },
    { header: 'Action', field: 'action' }
  ];

  eSign: ESign[] = [];

  // Komponen pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.currentPage =+ params['page'] || 1;
      if (this.searchQuery) {
        this.getSearchESign(this.searchQuery, this.currentPage, this.itemsPerPage);
      } else {
        this.getListESign(this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListESign(page: number, size: number): void {
    this.eSignService.listESign(page, size).subscribe({
      next: ({ code, status, data, actions, paging}) => {
        if(code === 200 && status === 'OK' && Array.isArray(data)) {
          this.eSign = data.map((eSign: ESign) => ({
            ...eSign,
            editLink: actions?.canEdit ? `/e-sign/${eSign.id}/edit` : null,
            deleteMethod: actions?.canDelete ? () => this.deleteCot(eSign) : null,
          }));
        } else {
          this.eSign = [];
        }
      }
    });
  }

  async deleteCot(cot: any): Promise<void> {

  }

  getSearchESign(query: string, page: number, size: number) {

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
