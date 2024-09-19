import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RealisasiCotChartComponent } from '../../components/realisasi-cot-chart/realisasi-cot-chart.component';
import { DataPemegangKompetensiGseOperatorComponent } from '../../components/data-pemegang-kompetensi-gse-operator/data-pemegang-kompetensi-gse-operator.component';
import { DataTotalSertifikatAktifComponent } from '../../components/data-total-sertifikat-aktif/data-total-sertifikat-aktif.component';
import { DataJumlahPemegangSertifikatComponent } from '../../components/data-jumlah-pemegang-sertifikat/data-jumlah-pemegang-sertifikat.component';
import { CotTableComponent } from './cot-table/cot-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    RealisasiCotChartComponent,
    DataPemegangKompetensiGseOperatorComponent,
    DataTotalSertifikatAktifComponent,
    DataJumlahPemegangSertifikatComponent,
    CotTableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
