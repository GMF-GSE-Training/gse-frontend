import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ESignFormComponent } from "../../../layouts/e-sign-form/e-sign-form.component";
import { CreateESign } from '../../../shared/model/e-sign.model';
import { ESignService } from '../../../shared/service/e-sign.service';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-add-sign',
  standalone: true,
  imports: [
    ESignFormComponent
],
  templateUrl: './add-sign.component.html',
  styleUrl: './add-sign.component.css'
})
export class AddSignComponent {
  constructor(
    private readonly eSignService: ESignService,
    private readonly router: Router,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly sweetalertService: SweetalertService,
  ) { }

  eSign: CreateESign = {
    idNumber: '',
    role: '',
    name: '',
    eSign: undefined!,
    signFileName: undefined,
    status: false
  }

  onSubmit(eSign: CreateESign) {
    const formData = this.prepareFormData(eSign);
    console.log(formData);
    this.eSignService.createESign(formData).subscribe({
      next: () => {
        this.router.navigateByUrl('/e-sign');
        this.sweetalertService.alert('Berhasil', 'E-Sign berhasil ditambahkan', 'success');
      },
      error: (error) => {
        this.errorHandlerService.alertError(error);
      }
    })
  }

  onFileChange(property: string, file: File | null): void {
    if (file) {
      (this.eSign as any)[property] = file;
      const fileNameProperty = `${property}FileName`;
      // Mengisi nama file ke property yang sesuai
      (this.eSign as any)[fileNameProperty] = file.name;
    }
  }

  private prepareFormData(eSign: any): FormData {
    const formData = new FormData();
    for (const key in eSign) {
      if (eSign.hasOwnProperty(key)) {
        const value = eSign[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      }
    }
    return formData;
  }
}
