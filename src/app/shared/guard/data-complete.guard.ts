import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ParticipantService } from '../service/participant.service';
import { SweetalertService } from '../service/sweetaler.service';

export const DataCompleteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Mengambil instance Router untuk navigasi
  const participantService = inject(ParticipantService); // Mengambil instance AuthService untuk memverifikasi user melalui metode me()
  const sweetalertService = inject(SweetalertService);

  // Ambil role user dan ID participant dari session storage
  const cachedUserRole = sessionStorage.getItem('currentUserRole');
  const cachedParticipantId = sessionStorage.getItem('participantId');

  if(cachedUserRole === 'user' && cachedParticipantId) {
    participantService.isDataComplete(cachedParticipantId).subscribe({
      next: (response) => {
        if(!response.data) {
          const alertState = sweetalertService.alert('Peringatan!', 'Anda tidak dapat melanjutkan ke halaman berikutnya karena data Anda belum lengkap. Silakan lengkapi data terlebih dahulu untuk melanjutkan.', 'warning');
          router.navigateByUrl(`/participants/${cachedParticipantId}/edit`, {
            state: { alert: alertState }
          });
          return false;
        }
        return true;
      },
      error: (error) => {
        console.log(error);
        return false;
      },
    })
  }
  return true;
};
