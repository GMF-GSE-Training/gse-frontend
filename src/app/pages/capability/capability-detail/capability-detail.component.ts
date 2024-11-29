import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapabilityService } from '../../../shared/service/capability.service';
import { CurriculumSyllabusFormComponent } from "../../../layouts/curriculum-syllabus-form/curriculum-syllabus-form.component";
import { Capability } from '../../../shared/model/capability.model';

@Component({
  selector: 'app-capability-detail',
  standalone: true,
  imports: [
    CurriculumSyllabusFormComponent
],
  templateUrl: './capability-detail.component.html',
  styleUrl: './capability-detail.component.css'
})
export class CapabilityDetailComponent implements OnInit {
  capability = {
    id: '',
    ratingCode: '',
    trainingCode: '',
    trainingName: ''
  }

  regulasiGSEs: Array<{ capabilityId: string; name: string; theoryDuration: number; practiceDuration: number; type: string; }> = [{
    capabilityId: '',
    name: '',
    theoryDuration: 0,
    practiceDuration: 0,
    type: '',
  }];

  kompetensis: Array<{ capabilityId: string; name: string; theoryDuration: number; practiceDuration: number; type: string }> = [{
    capabilityId: '',
    name: '',
    theoryDuration: 0,
    practiceDuration: 0,
    type: '',
  }];

  editLink: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly capabilityService: CapabilityService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editLink = `/curriculum-syllabus/${id}/edit`;

      this.capabilityService.getCapabilityById(id).subscribe({
        next: ({ data }) => {
          // Update capability data
          this.capability = {
            id: data.id,
            ratingCode: data.ratingCode,
            trainingCode: data.trainingCode,
            trainingName: data.trainingName,
          };

          // Filter and map curriculumSyllabus to regulasiGSEs and kompetensis
          this.regulasiGSEs = data.curriculumSyllabus!
            .filter(item => item.type === 'Regulasi GSE')
            .map(item => ({
              capabilityId: item.capabilityId,
              name: item.name,
              theoryDuration: item.theoryDuration,
              practiceDuration: item.practiceDuration,
              type: item.type,
            }));

          this.kompetensis = data.curriculumSyllabus!
            .filter(item => item.type === 'Kompetensi')
            .map(item => ({
              capabilityId: item.capabilityId,
              name: item.name,
              theoryDuration: item.theoryDuration,
              practiceDuration: item.practiceDuration,
              type: item.type,
            }));
        },
        error: (error) => console.log(error)
      });
    }
  }
}
