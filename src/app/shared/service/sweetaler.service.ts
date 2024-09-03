import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  async confirm(title: string, message: string, icon: SweetAlertIcon, confirmButtonText: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#02507E',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Tidak',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  alert(isConfirmed: boolean, title: string, message: string, icon: SweetAlertIcon): void {
    if (isConfirmed) {
      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonColor: '#02507E',
      });
    } else {
      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonColor: '#02507E',
      });
    }
  }
}
