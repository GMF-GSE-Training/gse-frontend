import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from '../../../elements/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../elements/button/blue-button/blue-button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ParticipantService } from '../../../shared/service/participant.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [
    HeaderComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
  ],
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.css'],
})
export class IdCardComponent implements OnInit {
  id_card: SafeHtml = '';
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private participantService: ParticipantService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    if(this.id) {
      this.participantService.viewIdCard(this.id).subscribe({
        next: (response) => {
          this.id_card = this.sanitizer.bypassSecurityTrustHtml(response);
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }

  downloadIdCard() {
    if (this.id) {
      this.participantService.downloadIdCard(this.id).subscribe({
        next: (response: Blob) => {
          // Use FileSaver to save the file
          saveAs(response, 'id-card.pdf');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
