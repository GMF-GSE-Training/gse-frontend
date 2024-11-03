import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { CotFormComponent } from "../../../layouts/cot-form/cot-form.component";
import { CotService } from '../../../shared/service/cot.service';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { COT, CreateCOT, UpdateCOT } from '../../../shared/model/cot.model';

@Component({
  selector: 'app-edit-cot',
  standalone: true,
  imports: [
    HeaderComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
    CotFormComponent
],
  templateUrl: './edit-cot.component.html',
  styleUrl: './edit-cot.component.css'
})
export class EditCotComponent implements OnInit {
  cot: COT = {
    id: '',
    kodeCot: '',
    capabilityId: '',
    tanggalMulai: undefined!,
    tanggalSelesai: undefined!,
    lokasiTraining: '',
    instrukturTeoriRegulasiGse: '',
    instrukturTeoriKompetensi: '',
    instrukturPraktek1: '',
    instrukturPraktek2: '',
    status: undefined!,
    Capability: undefined!,
  }

  constructor(
    private readonly cotService: CotService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly sweetalertService: SweetalertService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.cotService.getCotById(id).subscribe({
        next: (response) => {
          this.cot = response.data as COT;
          if (this.cot.tanggalMulai) {
            this.cot.tanggalMulai = new Date(this.cot.tanggalMulai).toISOString().split('T')[0];
          }
          if (this.cot.tanggalSelesai) {
            this.cot.tanggalSelesai = new Date(this.cot.tanggalSelesai).toISOString().split('T')[0];
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  onSubmit(cot: UpdateCOT) {
    this.cotService.updateCot(cot.id, cot).subscribe({
      next: () => {
        this.router.navigateByUrl('/cot');
        this.sweetalertService.alert(true, 'Berhasil', 'COT berhasil diperbarui', 'success');
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      }
    })
  }
}
