import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../shared/service/role.service';

@Component({
  selector: 'app-input-role-nik',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './input-role-nik.component.html',
  styleUrl: './input-role-nik.component.css'
})
export class InputRoleNikComponent {
  selectedRole: string | null = null;
  @Input() nik: string = '';
  @Output() roleIdChange = new EventEmitter<string>(); // Emit roleId ke parent
  @Output() nikChange = new EventEmitter<string>();
  @Output() validationMessage = new EventEmitter<string>();

  roles: any[] = [];
  showNikInput: boolean = false;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.getAllRoleName();
    this.toggleNikInput();
  }

  getAllRoleName(): void {
    this.roleService.getAllRoles().subscribe(response => {
      this.roles = response.data;
    });
  }

  toggleNikInput(): void {
    const selectedRole = this.roles.find(role => role.role === this.selectedRole);
    this.showNikInput = selectedRole && selectedRole.role === 'user';

    // Emit roleId ke parent
    if (selectedRole) {
      this.roleIdChange.emit(selectedRole.id); // Mengirim roleId
    }

    if (this.showNikInput && this.nik) {
      this.nikChange.emit(this.nik); // Emit nik jika showNikInput true
    }

    // Validasi role dan nik
    if (!this.selectedRole) {
      this.validationMessage.emit('Role harus diisi');
    } else if (this.showNikInput && !this.nik) {
      this.validationMessage.emit('NIK harus diisi untuk role user');
    } else {
      this.validationMessage.emit(''); // Clear error jika validasi sukses
    }
  }
}
