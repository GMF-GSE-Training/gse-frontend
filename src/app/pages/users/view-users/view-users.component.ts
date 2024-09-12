import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from '../../../elements/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../elements/button/blue-button/blue-button.component';
import { TableComponent } from "../../../components/table/table.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { ListUserResponse, User, UserResponse } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from "../../../components/title/title.component";

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent,
    RoleBasedAccessDirective,
    FormsModule,
    TitleComponent
],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit {
  columns = [
    { header: 'No Pegawai', field: 'no_pegawai' },
    { header: 'Nama', field: 'name' },
    { header: 'Dinas', field: 'dinas' },
    { header: 'Role', field: 'roleName' },
    { header: 'email', field: 'email' },
    { header: 'Action', field: 'action' }
  ];

  users: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchQuery: string = '';

  constructor(
    private userService: UserService,
    private sweetalertService: SweetalertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadParticipants(this.currentPage, this.itemsPerPage);
  }

  loadParticipants(page: number, size: number): void {
    this.userService.listUsers(page, size).subscribe((response: ListUserResponse) => {
      if (response.code === 200 && response.status === 'OK') {
        this.users = response.data.map((user: User) => {
          return {
            ...user,
            no_pegawai: user.no_pegawai ?? '-',
            dinas: user.dinas ?? '-',
            role: {
              id: user.role.id,
              role: user.role.role,
            },
            roleName: user.role.role,
            editLink: `/users/${user.id}/edit`,
            deleteMethod: () => this.deleteUser(user)
          };
        });
        this.totalPages = response.paging.total_page;
      }
      console.log(this.users);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadParticipants(this.currentPage, this.itemsPerPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadParticipants(this.currentPage, this.itemsPerPage);
    }
  }

  async deleteUser(user: User): Promise<void> {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', `Apakah anda ingin menghapus user ini : ${user.name}?`, 'warning', 'Ya, hapus!');
    if (isConfirmed) {
      console.log(user.id)
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.sweetalertService.alert(isConfirmed, 'Dihapus!', 'Data peserta berhasil dihapus', 'success');
          this.users = this.users.filter(p => p.id !== user.id);
        },
        error: (error) => {
          console.log(error)
          this.sweetalertService.alert(!isConfirmed, 'Gagal!', 'Gagal menghapus data peserta', 'error');
        }
      });
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: this.searchQuery, page: 1 }, // Update URL dengan query parameter
        queryParamsHandling: 'merge', // Pertahankan parameter lain yang ada
      });

      this.userService.searchUser(this.searchQuery, this.currentPage, this.itemsPerPage).subscribe({
        next: (response: ListUserResponse) => {
          if (response && response.code === 200 && response.status === 'OK') {
            this.users = response.data.map((user: User) => {
              return {
                ...user,
                no_pegawai: user.no_pegawai ?? '-',
                dinas: user.dinas ?? '-',
                role: {
                  id: user.role.id,
                  role: user.role.role,
                },
                roleName: user.role.role,
                editLink: `/users/${user.id}/edit`,
                deleteMethod: () => this.deleteUser(user)
              };
            });
            this.totalPages = response.paging.total_page;
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { search: this.searchQuery, page: 1 },
              queryParamsHandling: 'merge',
            })
          } else {
            this.users = []; // Kosongkan tabel jika tidak ada hasil
            this.totalPages = 1; // Reset jumlah halaman
            this.sweetalertService.alert(false, 'Tidak ditemukan!', 'Peserta tidak ditemukan.', 'warning');
          }
        },
        error: () => {
          this.users = []; // Kosongkan tabel jika terjadi error
          this.totalPages = 1; // Reset jumlah halaman
          this.sweetalertService.alert(false, 'Gagal!', 'Terjadi kesalahan saat mencari peserta.', 'error');
        }
      });
    }
  }
}
