import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { TableComponent } from "../../../component/table/table.component";
import { RoleBasedAccessDirective } from '../../../directive/role-based-access.directive';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent,
    RoleBasedAccessDirective
  ],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {
  columns = [
    { header: 'No Pegawai', field: 'noPegawai' },
    { header: 'Nama', field: 'nama' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Role', field: 'role' },
    { header: 'email', field: 'email' },
    { header: 'Action', field: 'action' }
  ];

  data = [
    { nama: 'Heri Susanto', noPegawai: '160088', dinas: 'TL', role: 'Admin', email: 'herisusanto@example.com', editLink: '/edit-user', deleteMethod: () => this.deleteParticipant('160088') },
    { nama: 'Agus Tariono', noPegawai: '160104', dinas: 'TL', role: 'Supervisor' },
    { nama: 'Adityo Akhmad Taufiq S.', noPegawai: '430869', dinas: 'TL', role: 'LCU' },
    { nama: 'Jaya Sunjaya', noPegawai: '430870', dinas: 'TL', role: 'User' },
    { nama: 'Andi Satria', noPegawai: '430880', dinas: 'TL', },
    { nama: 'Heri Dwi Irawan', noPegawai: '430882', dinas: 'TL', },
    { nama: 'I Nyoman Putra Jaya', noPegawai: '430890', dinas: 'TL', },
    { nama: 'I Ketut Jurnaedi', noPegawai: '430891', dinas: 'TL', },
    { nama: 'Lihansyah', noPegawai: '430892', dinas: 'TL', },
    { nama: 'Deni Jaelani', noPegawai: '430893', dinas: 'TL', },
    { nama: 'Heri Susanto', noPegawai: '160088', dinas: 'TZ', },
    { nama: 'Agus Tariono', noPegawai: '160104', dinas: 'TZ', },
    { nama: 'Adityo Akhmad Taufiq S.', noPegawai: '430869', dinas: 'TZ', },
    { nama: 'Jaya Sunjaya', noPegawai: '430870', dinas: 'TZ', },
    { nama: 'Andi Satria', noPegawai: '430880', dinas: 'TZ', },
    { nama: 'Heri Dwi Irawan', noPegawai: '430882', dinas: 'TZ', },
    { nama: 'I Nyoman Putra Jaya', noPegawai: '430890', dinas: 'TZ', },
    { nama: 'I Ketut Jurnaedi', noPegawai: '430891', dinas: 'TZ', },
    { nama: 'Lihansyah', noPegawai: '430892', dinas: 'TZ', },
    { nama: 'Deni Jaelani', noPegawai: '430893', dinas: 'TZ', },
    { nama: 'Heri Susanto', noPegawai: '160088', dinas: 'TU', },
    { nama: 'Agus Tariono', noPegawai: '160104', dinas: 'TU', },
    { nama: 'Adityo Akhmad Taufiq S.', noPegawai: '430869', dinas: 'TU', },
    { nama: 'Jaya Sunjaya', noPegawai: '430870', dinas: 'TU', },
    { nama: 'Andi Satria', noPegawai: '430880', dinas: 'TU', },
    { nama: 'Heri Dwi Irawan', noPegawai: '430882', dinas: 'TU', },
    { nama: 'I Nyoman Putra Jaya', noPegawai: '430890', dinas: 'TU', },
    { nama: 'I Ketut Jurnaedi', noPegawai: '430891', dinas: 'TU', },
    { nama: 'Lihansyah', noPegawai: '430892', dinas: 'TU', },
    { nama: 'Deni Jaelani', noPegawai: '430893', dinas: 'TU', },
    { nama: 'Heri Susanto', noPegawai: '160088', dinas: 'TV', },
    { nama: 'Agus Tariono', noPegawai: '160104', dinas: 'TV', },
    { nama: 'Adityo Akhmad Taufiq S.', noPegawai: '430869', dinas: 'TV', },
    { nama: 'Jaya Sunjaya', noPegawai: '430870', dinas: 'TV', },
    { nama: 'Andi Satria', noPegawai: '430880', dinas: 'TV', },
    { nama: 'Heri Dwi Irawan', noPegawai: '430882', dinas: 'TV', },
    { nama: 'I Nyoman Putra Jaya', noPegawai: '430890', dinas: 'TV', },
    { nama: 'I Ketut Jurnaedi', noPegawai: '430891', dinas: 'TV', },
    { nama: 'Lihansyah', noPegawai: '430892', dinas: 'TV', },
    { nama: 'Deni Jaelani', noPegawai: '430893', dinas: 'TV', },
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

  deleteParticipant(noPegawai: string) {
    alert(`Delete participant with noPegawai: ${noPegawai}`);
  }
}
