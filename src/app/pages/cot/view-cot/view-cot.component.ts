import { Component } from '@angular/core';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { TableComponent } from '../../../component/table/table.component';
import { RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';

@Component({
  selector: 'app-view-cot',
  standalone: true,
  imports: [
    NavbarComponent,
    TableComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
  ],
  templateUrl: './view-cot.component.html',
  styleUrl: './view-cot.component.css',
})
export class ViewCotComponent {
  columns = [
    { header: 'Kode COT', field: 'kodeCot' },
    { header: 'Mulai', field: 'mulai' },
    { header: 'Selesai', field: 'selesai' },
    { header: 'Kode Rating', field: 'kodeRating' },
    { header: 'Nama Training', field: 'namaTraining' },
    { header: 'Action', field: 'action' },
  ];

  data = [
    {
      kodeCot: 'GSE-REGJAN24-01',
      Mulai: '09 January 2024',
      Selesai: '10 January 2024',
      kodeRating: 'GSE - Reg',
      namaTraining: 'Regulasi GSE',
    },
    {
      kodeCot: 'BTTJAN24-02',
      Mulai: '10 January 2024',
      Selesai: '11 January 2024',
      kodeRating: 'BTT Cont',
      namaTraining: 'Baggage Towing Refreshment Tractor',
    },
    {
      kodeCot: 'FLTJAN24-04',
      Mulai: '15 January 2024',
      Selesai: '16 January 2024',
      kodeRating: 'FLT Cont',
      namaTraining: 'Forklift Refreshment',
    },
    {
      kodeCot: 'ATTJAN24-03',
      Mulai: '11 January 2024',
      Selesai: '12 January 2024',
      kodeRating: 'AAT Cont',
      namaTraining: 'Aircraft Towing Tractor Refreshment',
    },
    {
      kodeCot: 'GSE-REGJAN24-05',
      Mulai: '17 January 2024',
      Selesai: '18 January 2024',
      kodeRating: 'GSE - Reg',
      namaTraining: 'Regulasi GSE',
    },
    {
      kodeCot: 'FLTJAN24-06',
      Mulai: '25 January 2024',
      Selesai: '26 January 2024',
      kodeRating: 'FLT',
      namaTraining: 'Forklift',
    },
    {
      kodeCot: 'BTTJAN24-07',
      Mulai: '19 January 2024',
      Selesai: '24 January 2024',
      kodeRating: 'BTT',
      namaTraining: 'Baggage Towing Tractor',
    },
    {
      kodeCot: 'GSE-REGFEB24-01',
      Mulai: '01 February 2024',
      Selesai: '02 February 2024',
      kodeRating: 'GSE - Reg',
      namaTraining: 'Regulasi GSE',
    },
    {
      kodeCot: 'ACSCONTFEB24-02',
      Mulai: '02 February 2024',
      Selesai: '05 February 2024',
      kodeRating: 'ACS Cont',
      namaTraining: 'Air Conditioning System Refreshment',
    },
    {
      kodeCot: 'ASSCONTFEB24-06',
      Mulai: '06 February 2024',
      Selesai: '09 February 2024',
      kodeRating: 'ASS Cont',
      namaTraining: 'Air Starter System Refreshment',
    },
    {
      kodeCot: 'GSE-REGFEB24-14',
      Mulai: '13 February 2024',
      Selesai: '14 February 2024',
      kodeRating: 'GSE - Reg',
      namaTraining: 'Regulasi GSE',
    },
    {
      kodeCot: 'FLTFEB24-16',
      Mulai: '16 February 2024',
      Selesai: '19 February 2024',
      kodeRating: 'FLT',
      namaTraining: 'Forklift',
    },
    {
      kodeCot: 'BTTFEB24-26',
      Mulai: '26 February 2024',
      Selesai: '29 February 2024',
      kodeRating: 'BTT',
      namaTraining: 'Baggage Towing Tractor',
    },
    {
      kodeCot: 'GSE-REGFEB',
      Mulai: '22 February 2024',
      Selesai: '23 February 2024',
      kodeRating: 'GSE - Reg',
      namaTraining: 'Regulasi GSE',
    },
  ];

  currentPage = 1;
  itemsPerPage = 10;

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.data.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  deleteCot(noPegawai: string) {
    alert(`Delete participant with kode cot: ${noPegawai}`);
  }
}
