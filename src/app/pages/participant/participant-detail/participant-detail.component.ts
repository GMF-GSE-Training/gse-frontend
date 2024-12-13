import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { HorizontalTableComponent } from "../../../components/horizontal-table/horizontal-table.component";
import { TableComponent } from "../../../components/table/table.component";
import { ParticipantService } from '../../../shared/service/participant.service';
import { Participant } from '../../../shared/model/participant.model';
import { map } from 'rxjs/operators';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { CommonModule } from '@angular/common';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';
import saveAs from 'file-saver';
import { EmailFormCardComponent } from "../../../components/card/email-form-card/email-form-card.component";
import { PasswordUpdateFormCardComponent } from "../../../components/card/password-update-form-card/password-update-form-card.component";

@Component({
  selector: 'app-participant-detail',
  standalone: true,
  imports: [
    RouterLink,
    BlueButtonComponent,
    HorizontalTableComponent,
    TableComponent,
    RoleBasedAccessDirective,
    CommonModule,
    WhiteButtonComponent,
    RoleBasedAccessDirective,
    EmailFormCardComponent,
    PasswordUpdateFormCardComponent,
],
  templateUrl: './participant-detail.component.html',
  styleUrl: './participant-detail.component.css'
})
export class ParticipantDetailComponent implements OnInit {
  participant: Participant | null = null;
  leftTableData: any[] = [];
  rightTableData: any[] = [];
  editLink: string = '';
  photoType: string | null = '';
  backButtonRoute: string = '/participants';
  selectedItem: number = 0; // Elemen aktif

  dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

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

  userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');
  pasFoto = localStorage.getItem('pas_foto');
  qrCode = localStorage.getItem('qr_code');
  id = this.route.snapshot.paramMap.get('id') || this.userProfile.participant.id;
  idCardLink: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly participantService: ParticipantService,
    private readonly sweetalertService: SweetalertService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if(state) {
      this.backButtonRoute = state['data']
    } else {
      this.backButtonRoute = '/participants'
    }
  }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const url = urlSegments.map(segment => segment.path).join('/');
      if (url === `participants/${this.id}/profile/personal`) {
        this.selectedItem = 0;
      } else if (url === `participants/${this.id}/profile/account`) {
        this.selectedItem = 1;
      }
    });

    if(this.id && this.userProfile !== '{}') {
      if(this.userProfile.role.name === 'user') {
        this.getParticipantFromLocalStorage();
      } else {
        this.getParticipantById();
      }
    }
  }

  private getParticipantFromLocalStorage() {
    this.participant = this.userProfile.participant;
    const participant = this.userProfile.participant;
    if (participant) {
      this.setParticipantData(participant);
    }
  }

  private getParticipantById() {
    this.participantService.getParticipantById(this.id).subscribe({
      next: (response) => {
        if (response.data) {
          this.setParticipantData(response.data);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getFoto(id: string): void {
    this.participantService.getFoto(id).pipe(
      map(response => response.data)
    ).subscribe((foto: string) => {
      this.photoType = this.getMediaType(foto);
      this.pasFoto = foto;
      if(this.userProfile.role.name === 'user') {
        localStorage.setItem('pas_foto', foto);
      }
    })
  }

  getQrCode(id: string): void {
    this.participantService.getQrCode(id).pipe(
      map(response => response.data)
    ).subscribe((qrCode: string) => {
      this.qrCode = qrCode;
      if(this.userProfile.role.name === 'user') {
        localStorage.setItem('qr_code', qrCode);
      }
    });
  }

  downloadDocument() {
    if (this.id) {
      this.sweetalertService.loading('Mohon tunggu', 'Proses...');
      this.participantService.downloadIdCard(this.id).subscribe({
        next: (response) => {
          saveAs(response);
          this.sweetalertService.close();
        },
        error: (error) => {
          this.errorHandlerService.alertError(error);
          console.log(error);
        }
      });
    }
  }

  private setParticipantData(participant: Participant) {
    this.participant = participant;
    this.editLink = `/participants/${this.participant.id}/edit`;
    this.idCardLink = `/participants/${this.participant.id}/id-card`;

    this.leftTableData = [
      { label: 'Nama Peserta', value: this.participant.name },
      { label: 'Dinas', value: this.participant.dinas ?? '-' },
      { label: 'Bidang', value: this.participant.bidang ?? '-' },
      { label: 'Perusahaan', value: this.participant.company },
      { label: 'Email', value: this.participant.email },
      { label: 'No Telp', value: this.participant.phoneNumber }
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

    if(!this.pasFoto) {
      this.getFoto(this.participant.id);
    }
    if(!this.qrCode) {
      this.getQrCode(this.participant.id);
    }
  }

  private getMediaType(base64String: string): string {
    const header = base64String.slice(0, 4);
    if (header === 'iVBO') return 'image/png';
    if (header === '\uFFFD\uD8FF') return 'image/jpeg';
    if (header === 'JVBE') return 'application/pdf';
    return '';
  }
}
