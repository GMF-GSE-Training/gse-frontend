import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { WhiteButtonComponent } from '../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../component/button/blue-button/blue-button.component';
import { TableComponent } from "../../component/table/table.component";

@Component({
  selector: 'app-view-capability',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent
],
  templateUrl: './view-capability.component.html',
  styleUrl: './view-capability.component.css'
})
export class ViewCapabilityComponent {
  columns = [
    { header: 'Kode Rating', field: 'kodeRating' },
    { header: 'Kode Training', field: 'kodeTraining' },
    { header: 'Nama Training', field: 'namaTraining' },
    { header: 'Durasi Materi Regulas GSE', field: 'durasiMateriRegulasGSE' },
    { header: 'Durasi Materi Rating', field: 'durasiMateriRating' },
    { header: 'Total Durasi', field: 'totalDurasi' },
    { header: 'Kurikulum & Silabus', field: 'kurikulumSilabus' },
    { header: 'Action', field: 'action' }
  ];

  data = [
    { kodeRating: 'BTT', kodeTraining: 'TCT - 0535', namaTraining: 'Baggage Towing Tractor', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, kurikulumSilabus: '/home', action: '' },
    { kodeRating: 'FLT', kodeTraining: 'TCT - 0536', namaTraining: 'Forklift', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, kurikulumSilabus: '/home', action: '' },
    { kodeRating: 'RDS', kodeTraining: 'TCT - 0534', namaTraining: 'Refueling Defueling System', durasiMateriRegulasGSE: 24, durasiMateriRating: 40, totalDurasi: 64, kurikulumSilabus: '/home', action: '' },
    { kodeRating: 'GPS', kodeTraining: 'TCT - 0526', namaTraining: 'Ground Power System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, kurikulumSilabus: '/home', action: '' },
    { kodeRating: 'ACS', kodeTraining: 'TCT - 0528', namaTraining: 'Air Conditioning System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, kurikulumSilabus: 'home', action: '' },
    { kodeRating: 'ATT', kodeTraining: 'TCT - 0555', namaTraining: 'Aircraft Towing Tractor', durasiMateriRegulasGSE: 23, durasiMateriRating: 41, totalDurasi: 64, kurikulumSilabus: 'home', action: '' },
    { kodeRating: 'LSS', kodeTraining: 'TCT - 0530', namaTraining: 'Lavatory Service System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, kurikulumSilabus: '/home', action: '' },
    { kodeRating: 'WSS', kodeTraining: 'TCT - 0529', namaTraining: 'Water Service System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, kurikulumSilabus: '/home', action: '' },
    { kodeRating: 'ASS', kodeTraining: 'TCT - 0527', namaTraining: 'Air Starter System', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, kurikulumSilabus: '/home', action: '' },
    { kodeRating: 'MUV', kodeTraining: 'TCT - 0537', namaTraining: 'Maintenance Unit Vehicle', durasiMateriRegulasGSE: 23, durasiMateriRating: 25, totalDurasi: 48, kurikulumSilabus: '/home', action: '' }
  ];
}
