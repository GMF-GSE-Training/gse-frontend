import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { TitleComponent } from "../../../components/title/title.component";
import { CommonModule } from '@angular/common';
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Competency, CurriculumSyllabusRequest, RegulationGSE } from '../../../shared/model/curriculum-syllabus.model';
import { CurriculumSyllabusService } from '../../../shared/service/curriculum-syllabus.service';

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
  styleUrl: './add-curriculum.component.css'
})
export class AddCurriculumComponent {
  capability = {
    id: '',
    kode_rating: '',
    nama_training: '',
  };

  curriculumSyllabusRequest: CurriculumSyllabusRequest = {
    capabilityId: '',
    total_durasi: 0,
    regulasiGSEs: [],
    kompetensis: []
  };

  newRegulationGSE: RegulationGSE = {
    reg_gse: '',
    durasi_teori: 0,
    durasi_praktek: 0
  };

  newCompetency: Competency = {
    kompetensi: '',
    durasi_teori: 0,
    durasi_praktek: 0
  };

  regulasiGSEs: RegulationGSE[] = [{
    reg_gse: '',
    durasi_teori: 0,
    durasi_praktek: 0
  }];

  kompetensis: Competency[] = [{
    kompetensi: '',
    durasi_teori: 0,
    durasi_praktek: 0
  }];

  constructor(
    private readonly router: Router,
    private readonly curriculumSyllabusService: CurriculumSyllabusService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { id?: string, kode_rating?: string, nama_training?: string } | undefined;
    console.log(state)

    if (state) {
      this.capability.id = state.id || '';
      this.capability.kode_rating = state.kode_rating || '';
      this.capability.nama_training = state.nama_training || '';
      this.curriculumSyllabusRequest.capabilityId = state.id || '';
    }
  }

  inputGroup1: Array<any> = [];
  inputGroup2: Array<any> = [];

  addInput(group: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (group === 'group1') {
      this.regulasiGSEs.push({
        reg_gse: '',
        durasi_teori: 0,
        durasi_praktek: 0
      });
    } else if (group === 'group2') {
      this.kompetensis.push({
        kompetensi: '',
        durasi_teori: 0,
        durasi_praktek: 0
      });
    }
  }

  onSubmit() {
    this.curriculumSyllabusRequest = {
      capabilityId: this.capability.id,
      total_durasi: this.calculateTotalDuration(),
      regulasiGSEs: this.regulasiGSEs.map(item => ({
        ...item,
        durasi_teori: Number(item.durasi_teori),
        durasi_praktek: Number(item.durasi_praktek)
      })),
      kompetensis: this.kompetensis.map(item => ({
        ...item,
        durasi_teori: Number(item.durasi_teori),
        durasi_praktek: Number(item.durasi_praktek)
      }))
    };

    console.log(this.curriculumSyllabusRequest);

    this.curriculumSyllabusService.createCurriculumSyllabus(this.curriculumSyllabusRequest).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  calculateTotalDuration(): number {
    let total = 0;

    this.regulasiGSEs.forEach(item => {
      total += Number(item.durasi_teori) + Number(item.durasi_praktek);
    });

    this.kompetensis.forEach(item => {
      total += Number(item.durasi_teori) + Number(item.durasi_praktek);
    });

    return total;
  }
}
