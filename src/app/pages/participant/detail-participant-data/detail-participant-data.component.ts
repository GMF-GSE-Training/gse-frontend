import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { DetailedViewComponent } from "../../../component/detailed-view/detailed-view.component";
import { TableComponent } from "../../../component/table/table.component";

@Component({
  selector: 'app-detail-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    BlueButtonComponent,
    DetailedViewComponent,
    TableComponent
],
  templateUrl: './detail-participant-data.component.html',
  styleUrl: './detail-participant-data.component.css'
})
export class DetailParticipantDataComponent {
  columns = [
    { header: 'Nama Training', field: 'namaTraining' },
    { header: 'Exp', field: 'exp' },
  ];

  data = [
    {namaTraining: "Forklift", exp: "10 February 2026"},
    {namaTraining: "Regulasi GSE", exp: "10 February 2026"},
    {namaTraining: "Baggage Towing Tractor", exp: "10 February 2026"},
    {namaTraining: "Air Conditioning System Refreshment", exp: "10 February 2026"},
  ]

  leftTableData = [
    { label: 'User ID', value: '160088' },
    { label: 'Nama Peserta', value: 'Heri Susanto' },
    { label: 'Dinas', value: '-' },
    { label: 'Bidang', value: '-' },
    { label: 'Perusahaan', value: 'Kopkar' },
    { label: 'Email', value: '-' },
    { label: 'No Telp', value: '-' }
  ];

  rightTableData = [
    { label: 'Tempat Lahir', value: 'Tangerang' },
    { label: 'Tanggal Lahir', value: '-' },
    { label: 'SIM', value: '-' },
    { label: 'KTP', value: '-' },
    { label: 'Ket Sehat & Buta Warna', value: '-' },
    { label: 'Ket Bebas Narkoba', value: '-' },
  ];
}
