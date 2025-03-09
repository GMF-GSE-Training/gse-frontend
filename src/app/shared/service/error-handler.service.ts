import { Injectable } from '@angular/core';
import { SweetalertService } from './sweetaler.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private readonly sweetalertService: SweetalertService) {}

  /**
   * Menangani error dan menampilkan alert menggunakan SweetAlert.
   * @param error Error dari response backend.
   * @param requiredFields Daftar field yang diperlukan untuk validasi (opsional).
   */
  alertError(error?: any, requiredFields?: string[]): void {
    const errorDetails = error?.error?.errors;
    const status = error?.status; // Ambil status HTTP

    // Tangani error berdasarkan status HTTP
    if (status) {
      switch (status) {
        case 400:
          this.sweetalertService.alert('Gagal!', 'Data tidak valid, periksa input Anda.', 'error');
          return;
        case 409:
          this.sweetalertService.alert('Gagal!', 'Jadwal bertabrakan, silakan pilih waktu lain.', 'error');
          return;
        case 404:
          this.sweetalertService.alert('Gagal!', 'Data tidak ditemukan.', 'error');
          return;
        case 500:
          this.sweetalertService.alert('Gagal!', 'Kesalahan server, silakan coba lagi nanti.', 'error');
          return;
      }
    }

    // Tangani error berbasis errorDetails (dari backend)
    if (this.isObject(errorDetails) || Array.isArray(errorDetails)) {
      const formattedError = this.formatErrors(errorDetails);

      if (this.hasRequiredFields(errorDetails, requiredFields || [])) {
        this.sweetalertService.alert(
          'Gagal!',
          'Kolom dengan tanda bintang (*) wajib diisi',
          'error'
        );
      } else if (formattedError) {
        this.sweetalertService.alert('Gagal!', formattedError, 'error');
      }
    } else if (typeof errorDetails === 'string') {
      this.sweetalertService.alert('Gagal!', errorDetails, 'error');
    } else {
      this.sweetalertService.alert(
        'Gagal!',
        'Terjadi kesalahan, silakan coba lagi nanti.',
        'error'
      );
    }
  }

  /**
   * Mengembalikan pesan error dalam bentuk string.
   * @param error Error dari response backend.
   * @param requiredFields Daftar field yang diperlukan untuk validasi (opsional).
   * @returns Pesan error yang diformat.
   */
  getErrorMessage(error?: any, requiredFields?: string[]): string {
    const errorDetails = error?.error?.errors;
    const status = error?.status;

    // Tangani berdasarkan status HTTP
    if (status) {
      switch (status) {
        case 400: return 'Data tidak valid, periksa input Anda.';
        case 409: return 'Jadwal bertabrakan, silakan pilih waktu lain.';
        case 404: return 'Data tidak ditemukan.';
        case 500: return 'Kesalahan server, silakan coba lagi nanti.';
      }
    }

    // Tangani error berbasis errorDetails
    if (this.isObject(errorDetails) || Array.isArray(errorDetails)) {
      const formattedError = this.formatErrors(errorDetails);

      if (formattedError) {
        return formattedError;
      } else if (this.hasRequiredFields(errorDetails, requiredFields || [])) {
        return 'Kolom dengan tanda bintang (*) wajib diisi';
      }
    } else if (typeof errorDetails === 'string') {
      return errorDetails;
    }

    return 'Terjadi kesalahan, silakan coba lagi nanti.';
  }

  /**
   * Memformat error menjadi string yang dapat dibaca pengguna.
   * @param errors Objek atau array error dari backend.
   * @returns Pesan error yang diformat atau null jika tidak bisa diformat.
   */
  private formatErrors(errors: Record<string, string[]> | string[] | any): string | null {
    if (Array.isArray(errors)) {
      return errors
        .map((error) => {
          if (error.field && Array.isArray(error.messages)) {
            return `${error.field}: ${error.messages.join(', ')}`;
          }
          return error;
        })
        .filter(Boolean)
        .join('\n');
    } else if (this.isObject(errors)) {
      return Object.entries(errors)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
        .join('\n');
    }
    return null;
  }

  /**
   * Mengecek apakah objek memiliki field tertentu.
   * @param obj Objek untuk diperiksa.
   * @param fields Daftar field yang harus ada.
   * @returns `true` jika salah satu field ditemukan, `false` jika tidak.
   */
  private hasRequiredFields(obj: any, fields: string[]): boolean {
    if (!this.isObject(obj) || fields.length === 0) {
      return false;
    }
    return fields.some((field) => obj[field]);
  }

  /**
   * Mengecek apakah sebuah value adalah objek.
   * @param obj Value yang akan diperiksa.
   * @returns `true` jika value adalah objek, `false` jika tidak.
   */
  private isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }
}
