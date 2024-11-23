import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { DetailedViewComponent } from "../../../components/detailed-view/detailed-view.component";
import { TableComponent } from "../../../components/table/table.component";
import { ParticipantService } from '../../../shared/service/participant.service';
import { Participant } from '../../../shared/model/participant.model';
import { map } from 'rxjs/operators';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { CommonModule } from '@angular/common';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";

@Component({
  selector: 'app-participant-detail',
  standalone: true,
  imports: [
    RouterLink,
    BlueButtonComponent,
    DetailedViewComponent,
    TableComponent,
    RoleBasedAccessDirective,
    CommonModule,
    WhiteButtonComponent
],
  templateUrl: './participant-detail.component.html',
  styleUrl: './participant-detail.component.css'
})
export class ParticipantDetailComponent implements OnInit {
  participant: Participant | null = null;
  leftTableData: any[] = [];
  rightTableData: any[] = [];
  qrCode: string | undefined;
  foto: string | undefined;
  editLink: string = '';
  photoType: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private renderer: Renderer2
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

  id = this.route.snapshot.paramMap.get('id') || localStorage.getItem('participantId');

  ngOnInit(): void {
    if (this.id) {
      this.participantService.getParticipantById(this.id).subscribe({
        next: (response) => {
          if (response.status === 'OK' && response.code === 200) {
            this.participant = response.data as Participant;
            this.editLink = `/participants/${this.participant.id}/edit`;

            this.leftTableData = [
              { label: 'Nama Peserta', value: this.participant!.name },
              { label: 'Dinas', value: this.participant?.dinas ?? '-'},
              { label: 'Bidang', value: this.participant?.bidang ?? '-' },
              { label: 'Perusahaan', value: this.participant!.company },
              { label: 'Email', value: this.participant!.email },
              { label: 'No Telp', value: this.participant!.phoneNumber }
            ];

            this.rightTableData = [
              { label: 'Tempat Lahir', value: this.participant!.placeOfBirth },
              { label: 'Tanggal Lahir', value: this.participant!.dateOfBirth },
              { label: 'SIM A', value: '-', link: `/participants/${this.participant!.id}/sim-a` },
              { label: 'SIM B', value: '-', link: `/participants/${this.participant!.id}/sim-b` },
              { label: 'KTP', value: '-', link: `/participants/${this.participant!.id}/ktp` },
              { label: 'Surat Ket Sehat & Buta Warna', value: '-', link: `/participants/${this.participant!.id}/surat-sehat-buta-warna` },
              { label: 'Surat Ket Bebas Narkoba', value: '-', link: `/participants/${this.participant!.id}/surat-bebas-narkoba` },
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
    this.participantService.getFoto(id).subscribe({
      next: (response) => {
        if(response) {
          this.photoType = this.getMediaType(response.data as string);
          this.foto = response.data as string;
        }
      }
    });
  }

  getQrCode(id: string): void {
    this.participantService.getQrCode(id).pipe(
      map(response => response.data as string)
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
    if (header === 'iVBO') return 'image/png';
    if (header === '\uFFFD\uD8FF') return 'image/jpeg';
    if (header === 'JVBE') return 'application/pdf';

    return ''; // Unknown type
  }

  downloadQrCode(): void {
    if (this.qrCode) {
      const link = this.renderer.createElement('a');
      this.renderer.setAttribute(link, 'href', `data:image/png;base64,${this.qrCode}`);
      this.renderer.setAttribute(link, 'download', 'QR_Code.png');

      // Memasukkan elemen ke dalam DOM agar kompatibilitas terjaga
      this.renderer.appendChild(document.body, link);
      link.click();
      this.renderer.removeChild(document.body, link);
    } else {
      console.error('QR code is not available');
    }
  }
}
