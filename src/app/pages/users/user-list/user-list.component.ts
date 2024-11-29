import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    DataManagementComponent
],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  // Komponen title
  pageTitle = 'Users';

  // Komponen tabel
  columns = [
    { header: 'No Pegawai', field: 'idNumber' },
    { header: 'Nama', field: 'name' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Role', field: 'roleName' },
    { header: 'email', field: 'email' },
    { header: 'Action', field: 'action' }
  ];

  users: User[] = [];

  // Komponen pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchQuery: string = '';

  // Komponen Search
  placeHolder: string = 'Cari User';

  constructor(
    private userService: UserService,
    private sweetalertService: SweetalertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['keyword'] || '';
      this.currentPage =+ params['page'] || 1;
      if (this.searchQuery) {
        this.getSearchUsers(this.searchQuery, this.currentPage, this.itemsPerPage);
      } else {
        this.getListUsers(this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListUsers(page: number, size: number): void {
    this.userService.listUsers(page, size).subscribe({
      next: ({ data, actions, paging }) => {
        this.users = data.map((user: User) => {
          return {
            ...user,
            idNumber: user.idNumber ?? '-',
            dinas: user.dinas ?? '-',
            roleName: user.role.name,
            editLink: actions?.canEdit ? `/users/${user.id}/edit` : null,
            deleteMethod: actions?.canDelete ? () => this.deleteParticipant(user) : null,
          };
        });
        this.totalPages = paging?.totalPage ?? 1;
      },
      error: (error) => console.log(error),
    });
  }

  async deleteParticipant(user: User): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus peserta ini : ${user.idNumber}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.sweetalertService.loading('Mohon tunggu', 'Proses...');
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.sweetalertService.alert('Dihapus!', 'Data peserta berhasil dihapus', 'success');
          this.users = this.users.filter(p => p.id !== user.id);

          if(this.users.length === 0 && this.currentPage > 0) {
            this.currentPage -= 1;
          }

          if (this.searchQuery) {
            this.getSearchUsers(this.searchQuery, this.currentPage, this.itemsPerPage);
          } else {
            this.getListUsers(this.currentPage, this.itemsPerPage);
          }
          // Cek apakah halaman saat ini lebih besar dari total halaman
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages; // Pindah ke halaman sebelumnya
          }

          // Update query params dengan currentPage yang diperbarui
          const queryParams = this.searchQuery
            ? { keyword: this.searchQuery, page: this.currentPage }
            : { page: this.currentPage };

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge',
          });
        },
        error: (error) => {
          console.log(error);
          this.sweetalertService.alert('Gagal!', 'Terjadi kesalahan, coba lagi nanti', 'error');
        }
      });
    }
  }

  getSearchUsers(query: string, page: number, size: number) {
    this.userService.searchUser(query, page, size).subscribe({
      next: ({ data, actions, paging  }) => {
        this.users = data.map((user: User) => ({
          ...user,
          idNumber: user.idNumber ?? '-',
          dinas: user.dinas ?? '-',
          roleName: user.role.name,
          editLink: actions?.canEdit ? `/users/${user.id}/edit` : null,
          detailLink: actions?.canView ? `/users/${user.id}/view` : null,
          deleteMethod: actions?.canDelete ? () => this.deleteParticipant(user) : null,
        }));
        this.totalPages = paging?.totalPage ?? 1;
      },
      error: (error) => console.log(error),
    });
  }

  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.router.navigate([], {
      queryParams: { keyword: query, page: 1 },
      queryParamsHandling: 'merge',
    });
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
      queryParams: { keyword: undefined, page: undefined },
      queryParamsHandling: 'merge',
    });

    this.searchQuery = '';
  }
}
