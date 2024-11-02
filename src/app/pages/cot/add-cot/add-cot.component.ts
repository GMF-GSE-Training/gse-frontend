import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CotFormComponent } from "../../../layouts/cot-form/cot-form.component";
import { CreateCOT } from '../../../shared/model/cot.model';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';
import { CotService } from '../../../shared/service/cot.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-add-cot',
  standalone: true,
  imports: [
    CotFormComponent
],
  templateUrl: './add-cot.component.html',
  styleUrl: './add-cot.component.css'
})
export class AddCotComponent {
  cot: CreateCOT = {
    kodeCot: '',
    capabilityId: '',
    tanggalMulai: undefined!,
    tanggalSelesai: undefined!,
    lokasiTraining: '',
    instrukturTeoriRegulasiGse: '',
    instrukturTeoriKompetensi: '',
    instrukturPraktek1: '',
    instrukturPraktek2: ''
  }

  constructor(
    private readonly cotService: CotService,
    private readonly router: Router,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly sweetalertService: SweetalertService,
  ) { }

  onSubmit(cot: CreateCOT) {
    console.log(cot);
    this.cotService.createCot(cot).subscribe({
      next: () => {
        this.router.navigateByUrl('/cot');
        this.sweetalertService.alert(true, 'Berhasil', 'COT berhasil dibuat', 'success');
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      }
    })
  }
}
