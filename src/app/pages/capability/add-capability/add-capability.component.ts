import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { CapabilityService } from '../../../shared/service/capability.service';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from "../../../components/title/title.component";

@Component({
  selector: 'app-add-capability',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    TitleComponent
],
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
      }
    })
  }
}
