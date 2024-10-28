import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { TitleComponent } from "../../../components/title/title.component";
import { CommonModule } from '@angular/common';
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurriculumSyllabusService } from '../../../shared/service/curriculum-syllabus.service';
import { CreateCurriculumSyllabus } from '../../../shared/model/curriculum-syllabus.model';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

@Component({
  selector: 'app-add-curriculum',
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
  templateUrl: './add-curriculum.component.html',
  styleUrl: '../curriculum-syllabus.component.css'
})
export class AddCurriculumComponent {
  capability = {
    id:'',
    kodeRating: '',
    kodeTraining: '',
    namaTraining: ''
  }

  curriculumSyllabus: CreateCurriculumSyllabus = {
    curriculumSyllabus: []
  }

  regulasiGSEs: Array<{ capabilityId: string; nama: string; durasiTeori: number; durasiPraktek: number; type: string }> = [{
    capabilityId: '',
    nama: '',
    durasiTeori: 0,
    durasiPraktek: 0,
    type: 'Regulasi GSE'
  }];

  kompetensis: Array<{ capabilityId: string; nama: string; durasiTeori: number; durasiPraktek: number; type: string }> = [{
    capabilityId: '',
    nama: '',
    durasiTeori: 0,
    durasiPraktek: 0,
    type: 'Kompetensi'
  }];

  constructor(
    private readonly router: Router,
    private readonly curriculumSyllabusService: CurriculumSyllabusService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { id?: string, kodeRating?: string, namaTraining?: string } | undefined;
    console.log(state)

    if (state) {
      this.capability.id = state.id || '';
      this.capability.kodeRating = state.kodeRating || '';
      this.capability.namaTraining = state.namaTraining || '';

      // Assign capabilityId to the initial dynamic inputs
      this.regulasiGSEs[0].capabilityId = this.capability.id;
      this.kompetensis[0].capabilityId = this.capability.id;
    }
  }

  inputGroup1: Array<any> = [];
  inputGroup2: Array<any> = [];

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
    }).subscribe({
      next: () => {
        // Handle response
        this.router.navigateByUrl('/capability');
      },
      error: (error) => {
        // Handle error
        console.error('Error saving Curriculum & Syllabus', error);
        this.errorHandlerService.handleError(error);
      }
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

  deleteInput(group: string, indeks: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (group === 'group1') {
      this.regulasiGSEs.splice(indeks, 1); // Hapus item pada indeks yang diberikan untuk regulasiGSEs
    } else if (group === 'group2') {
      this.kompetensis.splice(indeks, 1); // Hapus item pada indeks yang diberikan untuk kompetensis
    }
  }
}
