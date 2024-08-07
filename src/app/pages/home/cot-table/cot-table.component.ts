import { Component } from '@angular/core';
import { TableComponent } from "../../../component/table/table.component";

@Component({
  selector: 'app-cot-table',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './cot-table.component.html',
  styleUrl: './cot-table.component.css'
})
export class CotTableComponent {
  columns = [
    { header: 'Nama Training', field: 'namaTraining' },
    { header: 'Mulai', field: 'mulai' },
    { header: 'Selesai', field: 'selesai' },
    { header: 'Kode Rating', field: 'kodeRating' },
    { header: 'Jumlah Peserta', field: 'jumlahPeserta' },
    { header: 'Lokasi Training', field: 'lokasiTraining' },
  ];

  data = [
    { kodeRating: 'BTT', namaTraining: 'Baggage Towing Tractor', },
    { kodeRating: 'FLT', namaTraining: 'Forklift', },
    { kodeRating: 'RDS', namaTraining: 'Refueling Defueling System', },
    { kodeRating: 'GPS', namaTraining: 'Ground Power System', },
    { kodeRating: 'ACS', namaTraining: 'Air Conditioning System', },
    { kodeRating: 'ATT', namaTraining: 'Aircraft Towing Tractor', },
    { kodeRating: 'LSS', namaTraining: 'Lavatory Service System', },
    { kodeRating: 'WSS', namaTraining: 'Water Service System', },
    { kodeRating: 'ASS', namaTraining: 'Air Starter System', },
    { kodeRating: 'MUV', namaTraining: 'Maintenance Unit Vehicle', },
    { kodeRating: 'BTT', namaTraining: 'Baggage Towing Tractor', },
    { kodeRating: 'FLT', namaTraining: 'Forklift', },
    { kodeRating: 'RDS', namaTraining: 'Refueling Defueling System', },
    { kodeRating: 'GPS', namaTraining: 'Ground Power System', },
    { kodeRating: 'ACS', namaTraining: 'Air Conditioning System', },
    { kodeRating: 'ATT', namaTraining: 'Aircraft Towing Tractor', },
    { kodeRating: 'LSS', namaTraining: 'Lavatory Service System', },
    { kodeRating: 'WSS', namaTraining: 'Water Service System', },
    { kodeRating: 'ASS', namaTraining: 'Air Starter System', },
    { kodeRating: 'MUV', namaTraining: 'Maintenance Unit Vehicle', },
    { kodeRating: 'BTT', namaTraining: 'Baggage Towing Tractor', },
    { kodeRating: 'FLT', namaTraining: 'Forklift', },
    { kodeRating: 'RDS', namaTraining: 'Refueling Defueling System', },
    { kodeRating: 'GPS', namaTraining: 'Ground Power System', },
    { kodeRating: 'ACS', namaTraining: 'Air Conditioning System', },
    { kodeRating: 'ATT', namaTraining: 'Aircraft Towing Tractor', },
    { kodeRating: 'LSS', namaTraining: 'Lavatory Service System', },
    { kodeRating: 'WSS', namaTraining: 'Water Service System', },
    { kodeRating: 'ASS', namaTraining: 'Air Starter System', },
    { kodeRating: 'MUV', namaTraining: 'Maintenance Unit Vehicle', },
    { kodeRating: 'BTT', namaTraining: 'Baggage Towing Tractor', },
    { kodeRating: 'FLT', namaTraining: 'Forklift', },
    { kodeRating: 'RDS', namaTraining: 'Refueling Defueling System', },
    { kodeRating: 'GPS', namaTraining: 'Ground Power System', },
    { kodeRating: 'ACS', namaTraining: 'Air Conditioning System', },
    { kodeRating: 'ATT', namaTraining: 'Aircraft Towing Tractor', },
    { kodeRating: 'LSS', namaTraining: 'Lavatory Service System', },
    { kodeRating: 'WSS', namaTraining: 'Water Service System', },
    { kodeRating: 'ASS', namaTraining: 'Air Starter System', },
    { kodeRating: 'MUV', namaTraining: 'Maintenance Unit Vehicle', }
  ];

  currentPage = 1;
  itemsPerPage = 6;

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
