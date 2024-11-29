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
  backButtonRoute: string = '/participants';

  dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private renderer: Renderer2
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if(state) {
      this.backButtonRoute = state['data']
    } else {
      this.backButtonRoute = '/participants'
    }
  }

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
          this.participant = response.data;
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
              { label: 'Tempat Lahir', value: this.participant.placeOfBirth },
              { label: 'Tanggal Lahir', value: new Date(this.participant.dateOfBirth).toLocaleDateString('id-ID', this.dateOptions) },
              { label: 'SIM A', link: `/participants/${this.participant.id}/sim-a` },
              { label: 'SIM B', link: `/participants/${this.participant.id}/sim-b` },
              { label: 'KTP', link: `/participants/${this.participant.id}/ktp` },
              { label: 'Exp Surat Sehat & Buta Warna',
                value: `${new Date(new Date(this.participant.tglKeluarSuratSehatButaWarna).setMonth(new Date(this.participant.tglKeluarSuratSehatButaWarna).getMonth() + 6)).toLocaleDateString('id-ID', this.dateOptions)}`,
                link: `/participants/${this.participant.id}/surat-sehat-buta-warna`
              },
              { label: 'Exp Surat Bebas Narkoba',
                value: `${new Date(new Date(this.participant.tglKeluarSuratBebasNarkoba).setMonth(new Date(this.participant.tglKeluarSuratBebasNarkoba).getMonth() + 6)).toLocaleDateString('id-ID', this.dateOptions)}`,
                link: `/participants/${this.participant.id}/surat-bebas-narkoba`
              },
            ];

            this.getFoto(this.participant.id);
            this.getQrCode(this.participant.id);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  getFoto(id: string): void {
    this.participantService.getFoto(id).subscribe({
      next: (data) => {
        if(data) {
          this.photoType = this.getMediaType(data.data);
          this.foto = data.data;
        }
      }
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
