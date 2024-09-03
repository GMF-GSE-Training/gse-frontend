import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { DetailedViewComponent } from "../../../component/detailed-view/detailed-view.component";
import { TableComponent } from "../../../component/table/table.component";
import { ParticipantService } from '../../../shared/service/participant.service';
import { Participant } from '../../../shared/model/participant.model';
import { map } from 'rxjs/operators';

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
export class DetailParticipantDataComponent implements OnInit {
  participant: Participant | null = null;
  leftTableData: any[] = [];
  rightTableData: any[] = [];
  qr_code: string | undefined;
  foto: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private participantService: ParticipantService
  ) {}

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.participantService.getParticipantById(id).subscribe(response => {
        if (response.status === 'OK' && response.code === 200) {
          this.participant = response.data;

          this.leftTableData = [
            { label: 'Nama Peserta', value: this.participant!.nama },
            { label: 'Dinas', value: this.participant?.dinas ?? '-'},
            { label: 'Bidang', value: this.participant?.bidang ?? '-' },
            { label: 'Perusahaan', value: this.participant!.perusahaan },
            { label: 'Email', value: this.participant!.email },
            { label: 'No Telp', value: this.participant!.no_telp }
          ];

          this.rightTableData = [
            { label: 'Tempat Lahir', value: this.participant!.tempat_lahir },
            { label: 'Tanggal Lahir', value: this.participant!.tanggal_lahir },
            { label: 'SIM A', value: '-' },
            { label: 'SIM B', value: '-' },
            { label: 'KTP', value: '-' },
            { label: 'Ket Sehat & Buta Warna', value: '-' },
            { label: 'Ket Bebas Narkoba', value: '-' },
          ];

          this.getFoto(this.participant!.id);
          this.getQrCode(this.participant!.id);
        } else {
          console.error('Failed to load participant data');
        }
      });
    }
  }

  getFoto(id: string): void {
    this.participantService.getFoto(id).pipe(
      map(response => response.data)
    ).subscribe((foto: string) => {
      this.foto = foto;
    });
  }

  getQrCode(id: string): void {
    this.participantService.getQrCode(id).pipe(
      map(response => response.data)
    ).subscribe((qrCode: string) => {
      this.qr_code = qrCode;
    });
  }
}
