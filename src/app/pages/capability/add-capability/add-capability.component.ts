import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CapabilityService } from '../../../shared/service/capability.service';
import { CapabilityFormComponent } from "../../../layouts/capability-form/capability-form.component";
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

@Component({
  selector: 'app-add-capability',
  standalone: true,
  imports: [CapabilityFormComponent],
  templateUrl: './add-capability.component.html',
  styleUrl: './add-capability.component.css'
})
export class AddCapabilityComponent {
  capability = {
    id: '',
    kodeRating: '',
    kodeTraining: '',
    namaTraining: '',
  };

  constructor(
    private readonly capabilityService: CapabilityService,
    private readonly router: Router,
    private readonly errorHandlerService: ErrorHandlerService
  ) { }

  onSubmit(capability: any) {
    const { id, ...request } = capability;
    this.capabilityService.createCapability(request).subscribe({
      next: (response) => {
        capability = response.data;
        this.router.navigateByUrl('/curriculum-syllabus/add', {
          state: {
            id: capability.id,
            kodeRating: capability.kodeRating,
            namaTraining: capability.namaTraining,
          }
        });
      },
      error: (error) => {
        console.log(error);
        this.errorHandlerService.handleError(error);
      }
    })
  }
}
