import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { TableComponent } from "../../../components/table/table.component";
import { SearchComponent } from "../../../components/search/search.component";

@Component({
  selector: 'app-view-capability',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent,
    SearchComponent,
],
  templateUrl: './view-capability.component.html',
  styleUrl: './view-capability.component.css'
})
export class ViewCapabilityComponent {
  columns = [
    { header: 'Kode Rating', field: 'kodeRating' },
    { header: 'Kode Training', field: 'kodeTraining' },
    { header: 'Nama Training', field: 'namaTraining' },
    { header: 'Durasi Materi Regulas GSE', field: 'durasiMateriRegulasGSE' },
    { header: 'Durasi Materi Rating', field: 'durasiMateriRating' },
    { header: 'Total Durasi', field: 'totalDurasi' },
    { header: 'Kurikulum & Silabus', field: 'kurikulumSilabus' },
    { header: 'Action', field: 'action' }
  ];

  data = [
    { kodeRating: 'BTT', kodeTraining: 'TCT - 0535', namaTraining: 'Baggage Towing Tractor', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, editLink: '/capability/edit', deleteMethod: () => this.deleteCapability('BTT') },
    { kodeRating: 'FLT', kodeTraining: 'TCT - 0536', namaTraining: 'Forklift', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'RDS', kodeTraining: 'TCT - 0534', namaTraining: 'Refueling Defueling System', durasiMateriRegulasGSE: 24, durasiMateriRating: 40, totalDurasi: 64, action: '' },
    { kodeRating: 'GPS', kodeTraining: 'TCT - 0526', namaTraining: 'Ground Power System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ACS', kodeTraining: 'TCT - 0528', namaTraining: 'Air Conditioning System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ATT', kodeTraining: 'TCT - 0555', namaTraining: 'Aircraft Towing Tractor', durasiMateriRegulasGSE: 23, durasiMateriRating: 41, totalDurasi: 64, action: '' },
    { kodeRating: 'LSS', kodeTraining: 'TCT - 0530', namaTraining: 'Lavatory Service System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'WSS', kodeTraining: 'TCT - 0529', namaTraining: 'Water Service System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ASS', kodeTraining: 'TCT - 0527', namaTraining: 'Air Starter System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'MUV', kodeTraining: 'TCT - 0537', namaTraining: 'Maintenance Unit Vehicle', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'BTT', kodeTraining: 'TCT - 0535', namaTraining: 'Baggage Towing Tractor', durasiMateriRegulasGSE: 25, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'FLT', kodeTraining: 'TCT - 0536', namaTraining: 'Forklift', durasiMateriRegulasGSE: 25, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'RDS', kodeTraining: 'TCT - 0534', namaTraining: 'Refueling Defueling System', durasiMateriRegulasGSE: 24, durasiMateriRating: 40, totalDurasi: 64, action: '' },
    { kodeRating: 'GPS', kodeTraining: 'TCT - 0526', namaTraining: 'Ground Power System', durasiMateriRegulasGSE: 25, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ACS', kodeTraining: 'TCT - 0528', namaTraining: 'Air Conditioning System', durasiMateriRegulasGSE: 25, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ATT', kodeTraining: 'TCT - 0555', namaTraining: 'Aircraft Towing Tractor', durasiMateriRegulasGSE: 25, durasiMateriRating: 41, totalDurasi: 64, action: '' },
    { kodeRating: 'LSS', kodeTraining: 'TCT - 0530', namaTraining: 'Lavatory Service System', durasiMateriRegulasGSE: 25, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'WSS', kodeTraining: 'TCT - 0529', namaTraining: 'Water Service System', durasiMateriRegulasGSE: 25, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ASS', kodeTraining: 'TCT - 0527', namaTraining: 'Air Starter System', durasiMateriRegulasGSE: 25, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'MUV', kodeTraining: 'TCT - 0537', namaTraining: 'Maintenance Unit Vehicle', durasiMateriRegulasGSE: 25, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'BTT', kodeTraining: 'TCT - 0535', namaTraining: 'Baggage Towing Tractor', durasiMateriRegulasGSE: 27, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'FLT', kodeTraining: 'TCT - 0536', namaTraining: 'Forklift', durasiMateriRegulasGSE: 27, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'RDS', kodeTraining: 'TCT - 0534', namaTraining: 'Refueling Defueling System', durasiMateriRegulasGSE: 24, durasiMateriRating: 40, totalDurasi: 64, action: '' },
    { kodeRating: 'GPS', kodeTraining: 'TCT - 0526', namaTraining: 'Ground Power System', durasiMateriRegulasGSE: 27, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ACS', kodeTraining: 'TCT - 0528', namaTraining: 'Air Conditioning System', durasiMateriRegulasGSE: 27, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ATT', kodeTraining: 'TCT - 0555', namaTraining: 'Aircraft Towing Tractor', durasiMateriRegulasGSE: 27, durasiMateriRating: 41, totalDurasi: 64, action: '' },
    { kodeRating: 'LSS', kodeTraining: 'TCT - 0530', namaTraining: 'Lavatory Service System', durasiMateriRegulasGSE: 27, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'WSS', kodeTraining: 'TCT - 0529', namaTraining: 'Water Service System', durasiMateriRegulasGSE: 27, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ASS', kodeTraining: 'TCT - 0527', namaTraining: 'Air Starter System', durasiMateriRegulasGSE: 27, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'MUV', kodeTraining: 'TCT - 0537', namaTraining: 'Maintenance Unit Vehicle', durasiMateriRegulasGSE: 27, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'BTT', kodeTraining: 'TCT - 0535', namaTraining: 'Baggage Towing Tractor', durasiMateriRegulasGSE: 29, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'FLT', kodeTraining: 'TCT - 0536', namaTraining: 'Forklift', durasiMateriRegulasGSE: 29, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'RDS', kodeTraining: 'TCT - 0534', namaTraining: 'Refueling Defueling System', durasiMateriRegulasGSE: 24, durasiMateriRating: 40, totalDurasi: 64, action: '' },
    { kodeRating: 'GPS', kodeTraining: 'TCT - 0526', namaTraining: 'Ground Power System', durasiMateriRegulasGSE: 29, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ACS', kodeTraining: 'TCT - 0528', namaTraining: 'Air Conditioning System', durasiMateriRegulasGSE: 29, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ATT', kodeTraining: 'TCT - 0555', namaTraining: 'Aircraft Towing Tractor', durasiMateriRegulasGSE: 29, durasiMateriRating: 41, totalDurasi: 64, action: '' },
    { kodeRating: 'LSS', kodeTraining: 'TCT - 0530', namaTraining: 'Lavatory Service System', durasiMateriRegulasGSE: 29, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'WSS', kodeTraining: 'TCT - 0529', namaTraining: 'Water Service System', durasiMateriRegulasGSE: 29, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'ASS', kodeTraining: 'TCT - 0527', namaTraining: 'Air Starter System', durasiMateriRegulasGSE: 29, durasiMateriRating: 25, totalDurasi: 48, action: '' },
    { kodeRating: 'MUV', kodeTraining: 'TCT - 0537', namaTraining: 'Maintenance Unit Vehicle', durasiMateriRegulasGSE: 29, durasiMateriRating: 25, totalDurasi: 48, action: '' }
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
    if ((this.currentPage * this.itemsPerPage) < this.data.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  deleteCapability(kodeRating: string) {
    alert(`Delete capability with kode rating: ${kodeRating}`);
  }
}
