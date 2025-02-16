import { Component } from '@angular/core';
import { RealisasiCotChartComponent } from '../../components/chart/realisasi-cot-chart/realisasi-cot-chart.component';
import { DataPemegangKompetensiGseOperatorComponent } from '../../components/chart/data-pemegang-kompetensi-gse-operator/data-pemegang-kompetensi-gse-operator.component';
import { DataTotalSertifikatAktifComponent } from '../../components/chart/data-total-sertifikat-aktif/data-total-sertifikat-aktif.component';
import { DataJumlahPemegangSertifikatComponent } from '../../components/chart/data-jumlah-pemegang-sertifikat/data-jumlah-pemegang-sertifikat.component';
import { TableComponent } from "../../components/table/table.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CotService } from '../../shared/service/cot.service';
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RealisasiCotChartComponent,
    DataPemegangKompetensiGseOperatorComponent,
    DataTotalSertifikatAktifComponent,
    DataJumlahPemegangSertifikatComponent,
    TableComponent,
    HeaderComponent,
    PaginationComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private readonly cotService: CotService,
  ){ }

  isLoading: boolean = false;
  dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric' // Pastikan nilai-nilai ini sesuai dengan spesifikasi Intl.DateTimeFormatOptions
  };

  columns = [
    { header: 'Nama Training', field: 'trainingName' },
    { header: 'Mulai', field: 'startDate' },
    { header: 'Selesai', field: 'endDate' },
    { header: 'Kode Rating', field: 'ratingCode' },
    { header: 'Jumlah Peserta', field: 'numberOfParticipants' },
    { header: 'Lokasi Training', field: 'trainingLocation' },
  ];

  cot: any[] = [];

  currentPage = 1;
  itemsPerPage = 6;
  totalPages: number = 0;

  ngOnInit(): void {
    this.getListCot('', this.currentPage, this.itemsPerPage, '', '');
  }

  getListCot(searchQuery: string, page: number, size: number, startDate: string, endDate: string): void {
    this.isLoading = true;
    this.cotService.listCot(searchQuery, page, size, startDate, endDate).subscribe({
      next: ({ data, paging }) => {
        this.cot = data.map((cot) => ({
          trainingName: cot.capability?.trainingName,
          ratingCode: cot.capability?.ratingCode,
          startDate: new Date(cot.startDate).toLocaleDateString('id-ID', this.dateOptions),
          endDate: new Date(cot.endDate).toLocaleDateString('id-ID', this.dateOptions),
          numberOfParticipants: cot.numberOfParticipants,
          trainingLocation: cot.trainingLocation,
        }));

        this.totalPages = paging?.totalPage ?? 1;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getListCot('', this.currentPage, this.itemsPerPage, '', '');
  }
}
