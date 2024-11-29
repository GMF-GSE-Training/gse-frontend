import { Component, OnInit } from '@angular/core';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ParticipantService } from '../../../shared/service/participant.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { DisplayFilesComponent } from "../../../layouts/display-files/display-files.component";
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [
    BlueButtonComponent,
    RouterLink,
    DisplayFilesComponent
],
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.css'],
})
export class IdCardComponent implements OnInit {
  id_card: SafeHtml = '';
  id = this.route.snapshot.paramMap.get('id');
  navigationLink: string = `/participants/${this.id}/detail`;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly participantService: ParticipantService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly sweetalertService: SweetalertService,
  ){}

  ngOnInit(): void {
    this.participantService.viewIdCard(this.id!).subscribe({
      next: (response) => {
        this.id_card = this.sanitizer.bypassSecurityTrustHtml(response);
      },
      error: (error) => {
        const parsingError = JSON.parse(error.error);
        this.router.navigateByUrl(this.navigationLink ? this.navigationLink : '/participants');
        if(parsingError.code === 400) {
          this.sweetalertService.alert('Data Participant Belum Lengkap', 'Untuk melihat ID Card, pastikan semua data participant telah lengkap.', 'warning');
        }
      }
    });
  }

  downloadIdCard() {
    if (this.id) {
      this.participantService.downloadIdCard(this.id).subscribe({
        next: (response: Blob) => {
          saveAs(response, 'id-card.pdf');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
