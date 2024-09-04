import { Component, Input, OnInit } from '@angular/core';
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
export class InputCompanyComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() triggerOption: string = '';
  selectedCompany: string = '';
  showCompanyInput: boolean = false;
  companyName: string = '';

  ngOnInit(): void {
    if (this.options.length > 0) {
      this.selectedCompany = this.options[0];
      this.toggleCompanyInput();
    }
  }

  toggleCompanyInput() {
    this.showCompanyInput = this.selectedCompany === this.triggerOption;
  }

  getCompanyName(): string {
    return this.selectedCompany === this.triggerOption ? this.companyName : this.selectedCompany;
  }
}
