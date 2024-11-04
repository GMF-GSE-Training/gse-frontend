import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { TitleComponent } from "../../../components/title/title.component";
import { CapabilityService } from '../../../shared/service/capability.service';
import { FormsModule } from '@angular/forms';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { CapabilityFormComponent } from "../../../layouts/capability-form/capability-form.component";

@Component({
  selector: 'app-edit-capability',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    TitleComponent,
    FormsModule,
    CapabilityFormComponent
],
  templateUrl: './edit-capability.component.html',
  styleUrl: './edit-capability.component.css'
})
export class EditCapabilityComponent implements OnInit {
  capability = {
    id: '',
    kodeRating: '',
    kodeTraining: '',
    namaTraining: '',
  };

  constructor(
    private readonly capabilityService: CapabilityService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly sweetalertService: SweetalertService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.capabilityService.getCapabilityById(id).subscribe({
        next: (response) => {
          if(typeof response.data === 'object') {
            this.capability = response.data;
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  onSubmit(capability: any) {
    const { id, ...request } = capability;
    this.capabilityService.updateCapability(id, request).subscribe({
      next: () => {
        this.sweetalertService.alert('Berhasil', 'Capability berhasil diperbarui', 'success');
        this.router.navigateByUrl('/capability');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
