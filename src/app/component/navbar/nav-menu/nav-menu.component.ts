import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  @Input() isMenuVisible: boolean = false;
  @Output() menuClose = new EventEmitter<void>();

  closeMenu() {
    this.isMenuVisible = false;
    this.menuClose.emit();
  }
}
