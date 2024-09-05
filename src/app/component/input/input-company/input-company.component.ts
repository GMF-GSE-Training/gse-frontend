import { Component, Input } from '@angular/core';
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
  @Input() selectedCompany: string = 'GMF';
  @Input() showCompanyInput: boolean = false;
  @Input() companyName: string = '';

  toggleCompanyInput() {
    this.showCompanyInput = this.selectedCompany === 'Non GMF';
  }

  getCompanyName(): string {
    return this.selectedCompany === 'Non GMF' ? this.companyName : 'GMF';
  }
}
