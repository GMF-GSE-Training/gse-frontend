import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../../components/title/title.component";
import { BaseInputComponent } from "../../../components/input/base-input/base-input.component";
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CapabilityService } from '../../../shared/service/capability.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurriculumSyllabusService } from '../../../shared/service/curriculum-syllabus.service';

@Component({
  selector: 'app-edit-curriculum-syllabus',
  standalone: true,
  imports: [
    TitleComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    RouterLink,
    CommonModule,
],
  templateUrl: './edit-curriculum-syllabus.component.html',
  styleUrl: './edit-curriculum-syllabus.component.css'
})
export class EditCurriculumSyllabusComponent implements OnInit {
  clas: string = 'add-button delete-button';
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly capabilityService: CapabilityService,
    private readonly curriculumSyllabusService: CurriculumSyllabusService,
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
    }
  }

  onSubmit() {
    // Parse input group 1 (Regulasi GSEs) to ensure numbers are correct
    this.regulasiGSEs = this.regulasiGSEs.map(item => ({
      ...item,
      durasiTeori: Number(item.durasiTeori),  // Konversi ke number
      durasiPraktek: Number(item.durasiPraktek),  // Konversi ke number
    }));

    // Parse input group 2 (Kompetensis) to ensure numbers are correct
    this.kompetensis = this.kompetensis.map(item => ({
      ...item,
      durasiTeori: Number(item.durasiTeori),  // Konversi ke number
      durasiPraktek: Number(item.durasiPraktek),  // Konversi ke number
    }));

    // Gabungkan semua data ke dalam curriculumSyllabus
    const curriculumSyllabusData = [
      ...this.regulasiGSEs,
      ...this.kompetensis
    ];

    // Panggil service untuk mengirim data ke backend
    this.curriculumSyllabusService.createCurriculumSyllabus({
      curriculumSyllabus: curriculumSyllabusData
    }).subscribe(response => {
      // Handle response
      console.log('Curriculum & Syllabus saved successfully', response);
    }, error => {
      // Handle error
      console.error('Error saving Curriculum & Syllabus', error);
    });
  }

  addInput(group: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const capabilityId = this.capability.id; // Assuming capabilityId is the same as capability.id

    if (group === 'group1') {
      this.regulasiGSEs.push({
        capabilityId,
        nama: '', // Add name for this item
        durasiTeori: 0,
        durasiPraktek: 0,
        type: 'Regulasi GSE' // Set default type
      });
    } else if (group === 'group2') {
      this.kompetensis.push({
        capabilityId,
        nama: '', // Add name for this item
        durasiTeori: 0,
        durasiPraktek: 0,
        type: 'Kompetensi' // Set default type
      });
    }
  }

  deleteInput(group: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (group === 'group1') {
      this.regulasiGSEs.splice((this.regulasiGSEs.length - 1), 1); // Hapus item pada indeks yang diberikan untuk regulasiGSEs
    } else if (group === 'group2') {
      this.kompetensis.splice((this.kompetensis.length - 1), 1); // Hapus item pada indeks yang diberikan untuk kompetensis
    }
  }
}
