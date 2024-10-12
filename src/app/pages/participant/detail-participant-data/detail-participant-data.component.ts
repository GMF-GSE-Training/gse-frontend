import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { DetailedViewComponent } from "../../../components/detailed-view/detailed-view.component";
import { TableComponent } from "../../../components/table/table.component";
import { ParticipantService } from '../../../shared/service/participant.service';
import { Participant, ParticipantResponse } from '../../../shared/model/participant.model';
import { map } from 'rxjs/operators';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { CommonModule } from '@angular/common';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";

@Component({
  selector: 'app-detail-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    BlueButtonComponent,
    DetailedViewComponent,
    TableComponent,
    RoleBasedAccessDirective,
    CommonModule,
    WhiteButtonComponent
],
  templateUrl: './detail-participant-data.component.html',
  styleUrl: './detail-participant-data.component.css'
})
export class DetailParticipantDataComponent implements OnInit {
  participant: Participant | null = null;
  leftTableData: any[] = [];
  rightTableData: any[] = [];
  qrCode: string | undefined;
  foto: string | undefined;
  editLink: string = '';
  photoType: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      this.participantService.getParticipantById(id).subscribe({
        next: (response) => {
          if (response.status === 'OK' && response.code === 200) {
            this.participant = response.data;
            this.editLink = `/participants/${this.participant.id}/edit`;

            this.leftTableData = [
              { label: 'Nama Peserta', value: this.participant!.nama },
              { label: 'Dinas', value: this.participant?.dinas ?? '-'},
              { label: 'Bidang', value: this.participant?.bidang ?? '-' },
              { label: 'Perusahaan', value: this.participant!.perusahaan },
              { label: 'Email', value: this.participant!.email },
              { label: 'No Telp', value: this.participant!.noTelp }
            ];

            this.rightTableData = [
              { label: 'Tempat Lahir', value: this.participant!.tempatLahir },
              { label: 'Tanggal Lahir', value: this.participant!.tanggalLahir },
              { label: 'SIM A', value: '-', link: `/participants/${this.participant!.id}/sim-a` },
              { label: 'SIM B', value: '-', link: `/participants/${this.participant!.id}/sim-b` },
              { label: 'KTP', value: '-', link: `/participants/${this.participant!.id}/ktp` },
              { label: 'Ket Sehat & Buta Warna', value: '-', link: `/participants/${this.participant!.id}/surat-sehat-buta-warna` },
              { label: 'Ket Bebas Narkoba', value: '-', link: `/participants/${this.participant!.id}/surat-bebas-narkoba` },
            ];

            this.getFoto(this.participant!.id);
            this.getQrCode(this.participant!.id);
          } else {
            console.error('Failed to load participant data');
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  getFoto(id: string): void {
    this.participantService.getFoto(id).pipe(
      map((response) => {
        console.log('API Response:', response); // Log respons lengkap
        return response.data;
      })
    ).subscribe((foto: string) => {
      console.log('Received foto:', foto); // Tambahkan log ini
      this.photoType = this.getMediaType(foto);
      this.foto = foto;
    });
  }

  getQrCode(id: string): void {
    this.participantService.getQrCode(id).pipe(
      map(response => response.data)
    ).subscribe((qrCode: string) => {
      this.qrCode = qrCode;
    });
  }

  cetakKartuPeserta(): void {
    if (this.participant && this.participant.id) {
      this.router.navigate([`/participants/${this.participant.id}/id-card`]); // Navigasi ke halaman id-card
    }
  }

  private getMediaType(base64String: string): string {
    const header = base64String.slice(0, 4);
    console.log('Header:', header); // Log header
    if (header === 'iVBO') return 'image/png';
    if (header === '\uFFFD\uD8FF') return 'image/jpeg';
    if (header === 'JVBE') return 'application/pdf';

    return ''; // Unknown type
  }
}
