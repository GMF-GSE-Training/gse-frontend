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
      this.searchQuery = params['q'] || '';
      this.currentPage =+ params['page'] || 1;
      if (this.searchQuery) {
        this.getSearchUsers(this.searchQuery, this.currentPage, this.itemsPerPage);
      } else {
        this.getListUsers(this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListUsers(page: number, size: number): void {
    this.userService.listUsers(page, size).subscribe((response) => {
      this.users = (response.data as User[]).map((user: User) => {
        return {
          ...user,
          idNumber: user.idNumber ?? '-',
          dinas: user.dinas ?? '-',
          roleName: user.role.name,
          editLink: response.actions.canEdit ? `/users/${user.id}/edit` : null,
          deleteMethod: response.actions.canDelete ? () => this.deleteParticipant(user) : null,
        };
      });
      this.totalPages = response.paging.totalPage;
      if (response.code === 200 && response.status === 'OK') {
      } else {
        this.users = [];
      }
    });
  }

  async deleteParticipant(user: User): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus peserta ini : ${user.idNumber}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.sweetalertService.alert('Dihapus!', 'Data peserta berhasil dihapus', 'success');
          this.users = this.users.filter(p => p.id !== user.id);
        },
        error: () => {
          this.sweetalertService.alert('Gagal!', 'Gagal menghapus data peserta', 'error');
        }
      });
    }
  }

  getSearchUsers(query: string, page: number, size: number) {
    this.userService.searchUser(query, page, size).subscribe({
      next: (response) => {
        if (response?.code === 200 && response.status === 'OK') {
          console.log('Search Response', response);
          this.users = (response.data as User[]).map((user: User) => ({
            ...user,
            idNumber: user.idNumber ?? '-',
            dinas: user.dinas ?? '-',
            roleName: user.role.name,
            editLink: response.actions.canEdit ? `/users/${user.id}/edit` : null,
            detailLink: response.actions.canView ? `/users/${user.id}/view` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteParticipant(user) : null,
          }));
          this.totalPages = response.paging.totalPage;
        } else {
          console.warn('Data tidak ditemukan');
          this.users = [];
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.users = [];
      }
    });
  }

  onSearchChanged(query: string): void {
    this.searchQuery = query;
    this.router.navigate([], {
      queryParams: { search: query },
      queryParamsHandling: 'merge',
    });
    this.getSearchUsers(query, 1, this.itemsPerPage);
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
