import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleBasedAccessDirective } from '../../shared/directive/role-based-access.directive';

@Component({
  selector: 'app-icon-action',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RoleBasedAccessDirective,
  ],
  templateUrl: './icon-action.component.html',
  styleUrl: './icon-action.component.css',
})
export class IconActionComponent {
  @Input() addLink?: string;
  @Input() printLink?: string;
  @Input() editLink?: string;
  @Input() detailLink?: string;
  @Input() delete?: () => any;
}
