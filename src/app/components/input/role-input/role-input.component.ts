import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() initialRole: any = null;
  selectedRole: any = null;
  @Input() label: string = '';
  @Input() isRequired: boolean = false;

  @Output() roleChange = new EventEmitter<any>(); // Emit role ke parent

  roles: any[] = [];

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.getAllRoleName();
  }

  getAllRoleName(): void {
    this.roleService.getAllRoles().subscribe(response => {
      this.roles = response.data;
      if (this.initialRole) {
        this.selectedRole = this.roles.find(role => role.id === this.initialRole.id);
        this.onRoleChange();
      }
    });
  }

  onRoleChange() {
    this.roleChange.emit(this.selectedRole);
  }
}
