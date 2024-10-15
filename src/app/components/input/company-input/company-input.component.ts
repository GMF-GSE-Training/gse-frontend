import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-input',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './company-input.component.html',
  styleUrl: './company-input.component.css',
})
export class CompanyInputComponent {
  @Input() selectedCompany: string = '';
  @Input() showCompanyInput: boolean = false;
  @Input() companyName: string = '';
  @Input() name: string = '';

  ngOnInit(): void {
    console.log(this.selectedCompany)
    if(!this.selectedCompany) {
      this.selectedCompany = 'GMF';
    }
  }

  toggleCompanyInput() {
    this.showCompanyInput = this.selectedCompany === 'Non GMF';
  }

  getCompanyName(): string {
    return this.selectedCompany === 'Non GMF' ? this.companyName : 'GMF';
  }
}
