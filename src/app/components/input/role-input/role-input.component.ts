import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../../../shared/service/role.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-input',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './role-input.component.html',
  styleUrl: './role-input.component.css'
})
export class RoleInputComponent {
  selectedRole = {
    id: '',
    role: '',
  };

  @Output() roleChange = new EventEmitter<{ id: string, role: string }>(); // Emit roleId ke parent
  @Output() validationMessage = new EventEmitter<string>();

  roles: { id: string, role: string }[] = [];

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.getAllRoleName();
  }

  getAllRoleName(): void {
    this.roleService.getAllRoles().subscribe(response => {
      this.roles = response.data;
    });
  }

  onRoleChange() {
    this.roleChange.emit(this.selectedRole);
  }
}
