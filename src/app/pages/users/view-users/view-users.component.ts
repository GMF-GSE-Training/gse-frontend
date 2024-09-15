import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from '../../../elements/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../elements/button/blue-button/blue-button.component';
import { TableComponent } from "../../../components/table/table.component";
import { ListUserResponse, User, UserResponse } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from "../../../components/title/title.component";
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent,
    FormsModule,
    TitleComponent,
    DataManagementComponent
],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit {
  // Komponen title
  pageTitle = 'View Users';

  // Komponen tabel
  columns = [
    { header: 'No Pegawai', field: 'no_pegawai' },
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
  placeHolder: string = 'Search User';

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
    this.userService.listUsers(page, size).subscribe((response: ListUserResponse) => {
      if (response.code === 200 && response.status === 'OK') {
        console.log('List Response', response)
        this.users = response.data.map((user: User) => {
          return {
            ...user,
            no_pegawai: user.no_pegawai ?? '-',
            dinas: user.dinas ?? '-',
            editLink: response.actions.canEdit ? `/users/${user.id}/edit` : null,
            detailLink: response.actions.canView ? `/users/${user.id}/view` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteParticipant(user) : null,
          };
        });
        this.totalPages = response.paging.total_page;
      } else {
        this.users = [];
      }
    });
  }

  async deleteParticipant(user: User): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus peserta ini : ${user.no_pegawai}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.sweetalertService.alert(isConfirmed, 'Dihapus!', 'Data peserta berhasil dihapus', 'success');
          this.users = this.users.filter(p => p.id !== user.id);
        },
        error: () => {
          this.sweetalertService.alert(!isConfirmed, 'Gagal!', 'Gagal menghapus data peserta', 'error');
        }
      });
    }
  }

  getSearchUsers(query: string, page: number, size: number) {
    this.userService.searchUser(query, page, size).subscribe((response: ListUserResponse) => {
      if (response.code === 200 && response.status === 'OK') {
        console.log('Search Response', response);
        this.users = response.data.map((user: User) => {
          return {
            ...user,
            no_pegawai: user.no_pegawai ?? '-',
            dinas: user.dinas ?? '-',
            editLink: response.actions.canEdit ? `/users/${user.id}/edit` : null,
            detailLink: response.actions.canView ? `/users/${user.id}/view` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteParticipant(user) : null,
          };
        });
        this.totalPages = response.paging.total_page;
      } else {
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

  onBlueButtonClick() {
    this.router.navigateByUrl('/users/add');
  }

  onWhiteButtonClick() {
    this.router.navigateByUrl('/home');
  }
}
