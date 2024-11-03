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
    private cotService: CotService,
    private router: Router,
    private route: ActivatedRoute,
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
      next: (response: any) => {
        if (response.code === 200 && response.status === 'OK') {
          this.cot = response.data.map((cot: any) => ({
            kodeCot: cot.kodeCot,
            tanggalMulai: new Date(cot.tanggalMulai).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            tanggalSelesai: new Date(cot.tanggalSelesai).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            kodeRating: cot.Capabillity.kodeRating,
            namaTraining: cot.Capabillity.namaTraining,
            editLink: response.actions.canEdit ? `/cot/${cot.id}/edit` : null,
            detailLink: response.actions.canView ? `/cot/${cot.id}/detail` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteCot(cot) : null,
          }));
          this.totalPages = response.paging.totalPage;
        } else {
          this.cot = [];
        }
      },
      error: (error) => {
        console.log(error)
        this.cot = [];
      }
    });
  }

  deleteCot(cot: COT[]) {
    throw new Error('Method not implemented.');
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
