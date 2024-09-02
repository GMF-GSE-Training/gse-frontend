import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-company',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './input-company.component.html',
  styleUrl: './input-company.component.css',
})
export class InputCompanyComponent {
  selectedCompany: string = 'GMF';
  showCompanyInput: boolean = false;
  companyName: string = '';

  toggleCompanyInput() {
    this.showCompanyInput = this.selectedCompany === 'Non GMF';
  }

  getCompanyName(): string {
    return this.selectedCompany === 'Non GMF' ? this.companyName : 'GMF';
  }
}
