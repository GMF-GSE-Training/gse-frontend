import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { WhiteButtonComponent } from '../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../component/button/blue-button/blue-button.component';
import { TableComponent } from "../../component/table/table.component";

@Component({
  selector: 'app-view-participant-data',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent
],
  templateUrl: './view-participant-data.component.html',
  styleUrl: './view-participant-data.component.css'
})
export class ViewParticipantDataComponent {
  columns = [
    { header: 'No Pegawai', field: 'noPegawai' },
    { header: 'Nama', field: 'nama' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Bidang', field: 'bidang' },
    { header: 'Perusahaan', field: 'perusahaan' },
    { header: 'Action', field: 'action' }
  ];

  data = [
    { nama: 'Heri Susanto', noPegawai: '160088', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'Kopkar', action: '' },
    { nama: 'Agus Tariono', noPegawai: '160104', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Adityo Akhmad Taufiq S.', noPegawai: '430869', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Jaya Sunjaya', noPegawai: '430870', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Andi Satria', noPegawai: '430880', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Heri Dwi Irawan', noPegawai: '430882', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'I Nyoman Putra Jaya', noPegawai: '430890', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'I Ketut Jurnaedi', noPegawai: '430891', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Lihansyah', noPegawai: '430892', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'GDPS', action: '' },
    { nama: 'Deni Jaelani', noPegawai: '430893', dinas: 'TL', bidang: 'TLC - 4', perusahaan: 'GDPS', action: '' },
    { nama: 'Heri Susanto', noPegawai: '160088', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'Kopkar', action: '' },
    { nama: 'Agus Tariono', noPegawai: '160104', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Adityo Akhmad Taufiq S.', noPegawai: '430869', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Jaya Sunjaya', noPegawai: '430870', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Andi Satria', noPegawai: '430880', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Heri Dwi Irawan', noPegawai: '430882', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'I Nyoman Putra Jaya', noPegawai: '430890', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'I Ketut Jurnaedi', noPegawai: '430891', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Lihansyah', noPegawai: '430892', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'GDPS', action: '' },
    { nama: 'Deni Jaelani', noPegawai: '430893', dinas: 'TZ', bidang: 'TLC - 4', perusahaan: 'GDPS', action: '' },
    { nama: 'Heri Susanto', noPegawai: '160088', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'Kopkar', action: '' },
    { nama: 'Agus Tariono', noPegawai: '160104', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Adityo Akhmad Taufiq S.', noPegawai: '430869', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Jaya Sunjaya', noPegawai: '430870', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Andi Satria', noPegawai: '430880', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Heri Dwi Irawan', noPegawai: '430882', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'I Nyoman Putra Jaya', noPegawai: '430890', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'I Ketut Jurnaedi', noPegawai: '430891', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Lihansyah', noPegawai: '430892', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'GDPS', action: '' },
    { nama: 'Deni Jaelani', noPegawai: '430893', dinas: 'TU', bidang: 'TLC - 4', perusahaan: 'GDPS', action: '' },
    { nama: 'Heri Susanto', noPegawai: '160088', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'Kopkar', action: '' },
    { nama: 'Agus Tariono', noPegawai: '160104', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Adityo Akhmad Taufiq S.', noPegawai: '430869', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Jaya Sunjaya', noPegawai: '430870', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Andi Satria', noPegawai: '430880', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Heri Dwi Irawan', noPegawai: '430882', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'I Nyoman Putra Jaya', noPegawai: '430890', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'I Ketut Jurnaedi', noPegawai: '430891', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'DPP', action: '' },
    { nama: 'Lihansyah', noPegawai: '430892', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'GDPS', action: '' },
    { nama: 'Deni Jaelani', noPegawai: '430893', dinas: 'TV', bidang: 'TLC - 4', perusahaan: 'GDPS', action: '' },
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
}
