import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { TitleComponent } from "../../../components/title/title.component";
import { CommonModule } from '@angular/common';
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CapabilityService } from '../../../shared/service/capability.service';

@Component({
  selector: 'app-capability-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    TitleComponent,
    CommonModule,
    BlueButtonComponent,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './capability-detail.component.html',
  styleUrl: './capability-detail.component.css'
})
export class CapabilityDetailComponent implements OnInit {
  capability = {
    id: '',
    kodeRating: '',
    kodeTraining: '',
    namaTraining: ''
  }

  regulasiGSEs: Array<{ capabilityId: string; nama: string; durasiTeori: number; durasiPraktek: number; type: string; }> = [{
    capabilityId: '',
    nama: '',
    durasiTeori: 0,
    durasiPraktek: 0,
    type: '',
  }];

  kompetensis: Array<{ capabilityId: string; nama: string; durasiTeori: number; durasiPraktek: number; type: string }> = [{
    capabilityId: '',
    nama: '',
    durasiTeori: 0,
    durasiPraktek: 0,
    type: '',
  }];

  inputGroup1: Array<any> = [];
  inputGroup2: Array<any> = [];

  editLink: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly capabilityService: CapabilityService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.capabilityService.getCapabilityById(id).subscribe({
        next: (response) => {
          if(typeof response.data === 'object') {
            const data = response.data;
            // Update capability data
            this.capability = {
              id: data.id,
              kodeRating: data.kodeRating,
              kodeTraining: data.kodeTraining,
              namaTraining: data.namaTraining,
            };

            // Filter and map curriculumSyllabus to regulasiGSEs and kompetensis
            this.regulasiGSEs = data.curriculumSyllabus!
              .filter(item => item.type === 'Regulasi GSE')
              .map(item => ({
                capabilityId: item.capabilityId,
                nama: item.nama,
                durasiTeori: item.durasiTeori,
                durasiPraktek: item.durasiPraktek,
                type: item.type,
              }));

            this.kompetensis = data.curriculumSyllabus!
              .filter(item => item.type === 'Kompetensi')
              .map(item => ({
                capabilityId: item.capabilityId,
                nama: item.nama,
                durasiTeori: item.durasiTeori,
                durasiPraktek: item.durasiPraktek,
                type: item.type,
              }));
          }
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.editLink = `/capability/${id}/edit`;
    }
  }
}
