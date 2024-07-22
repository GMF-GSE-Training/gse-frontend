import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RealisasiCotChartComponent } from './realisasi-cot-chart/realisasi-cot-chart.component';
import { DataPemegangKompetensiGseOperatorComponent } from './data-pemegang-kompetensi-gse-operator/data-pemegang-kompetensi-gse-operator.component';
import { DataTotalSertifikatAktifComponent } from './data-total-sertifikat-aktif/data-total-sertifikat-aktif.component';
import { DataJumlahPemegangSertifikatComponent } from './data-jumlah-pemegang-sertifikat/data-jumlah-pemegang-sertifikat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    RealisasiCotChartComponent,
    DataPemegangKompetensiGseOperatorComponent,
    DataTotalSertifikatAktifComponent,
    DataJumlahPemegangSertifikatComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
