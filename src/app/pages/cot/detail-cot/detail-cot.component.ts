import { Component } from '@angular/core';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { DetailedViewComponent } from '../../../component/detailed-view/detailed-view.component';
import { TableComponent } from '../../../component/table/table.component';
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-cot',
  standalone: true,
  imports: [
    NavbarComponent,
    DetailedViewComponent,
    TableComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
  ],
  templateUrl: './detail-cot.component.html',
  styleUrl: './detail-cot.component.css',
})
export class DetailCotComponent {
  leftTableData = [
    { label: 'Kode COT', value: 'GSE-REGJAN24-01' },
    { label: 'Kode Rating', value: 'GSE Reg' },
    { label: 'Nama training', value: 'Regulasi GSE' },
    { label: 'Tanggal Mulai', value: '09 January 2024' },
    { label: 'Tanggal Selesai', value: '10 January 2024' },
    { label: 'Lokasi Training', value: 'R.FAM-Material Building lt.2' },
  ];

  rightTableData = [
    { label: 'Instruktur Regulasi GSE', value: 'Fanny Nur Alim' },
    { label: 'Instruktur Teori Rating', value: '-' },
    { label: 'Instruktur Praktek 1', value: '-' },
    { label: 'Instruktur Praktek 2', value: '-' },
    { label: 'Jumlah Peserta', value: '18' },
    { label: 'Status', value: '-' },
  ];

  columns = [
    { header: 'No Pegawai', field: 'noPegawai' },
    { header: 'Nama', field: 'nama' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'SIM', field: 'sim' },
    { header: 'Exp ket Sehat & Buta Warna', field: 'expKetSehat' },
    { header: 'Exp Bebas Narkoba', field: 'expBebasNarkoba' },
    { header: 'Keterangan', field: 'keterangan' },
    { header: 'Action', field: 'action' },
  ];

  data = [
    {
      nama: 'Heri Susanto',
      noPegawai: '160088',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'Kopkar',
      editLink: '/edit-participant-data',
      detailLink: '/detail-participant-data',
      deleteMethod: () => this.deleteParticipant('160088'),
    },
    {
      nama: 'Agus Tariono',
      noPegawai: '160104',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Adityo Akhmad Taufiq S.',
      noPegawai: '430869',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Jaya Sunjaya',
      noPegawai: '430870',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Andi Satria',
      noPegawai: '430880',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Heri Dwi Irawan',
      noPegawai: '430882',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'I Nyoman Putra Jaya',
      noPegawai: '430890',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'I Ketut Jurnaedi',
      noPegawai: '430891',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Lihansyah',
      noPegawai: '430892',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'GDPS',
    },
    {
      nama: 'Deni Jaelani',
      noPegawai: '430893',
      dinas: 'TL',
      bidang: 'TLC - 4',
      perusahaan: 'GDPS',
    },
    {
      nama: 'Heri Susanto',
      noPegawai: '160088',
      dinas: 'TZ',
      bidang: 'TLC - 4',
      perusahaan: 'Kopkar',
    },
    {
      nama: 'Agus Tariono',
      noPegawai: '160104',
      dinas: 'TZ',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Adityo Akhmad Taufiq S.',
      noPegawai: '430869',
      dinas: 'TZ',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Jaya Sunjaya',
      noPegawai: '430870',
      dinas: 'TZ',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Andi Satria',
      noPegawai: '430880',
      dinas: 'TZ',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'Heri Dwi Irawan',
      noPegawai: '430882',
      dinas: 'TZ',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'I Nyoman Putra Jaya',
      noPegawai: '430890',
      dinas: 'TZ',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
    },
    {
      nama: 'I Ketut Jurnaedi',
      noPegawai: '430891',
      dinas: 'TZ',
      bidang: 'TLC - 4',
      perusahaan: 'DPP',
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

  deleteParticipant(noPegawai: string) {
    alert(`Delete participant with noPegawai: ${noPegawai}`);
  }
}
