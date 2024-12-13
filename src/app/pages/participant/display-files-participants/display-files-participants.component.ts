import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { ParticipantService } from '../../../shared/service/participant.service';
import { DisplayFilesComponent } from '../../../contents/display-files/display-files.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/pdf.worker.min.mjs';

@Component({
  selector: 'app-display-participants-files',
  standalone: true,
  imports: [
    DisplayFilesComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './display-files-participants.component.html',
  styleUrl: './display-files-participants.component.css'
})
export class DisplayFilesParticipantsComponent implements OnInit {
  pageTitle: string = '';
  id = this.route.snapshot.paramMap.get('id');
  navigationLink: string = '';
  file: string | undefined;
  fileType: string = '';
  safeUrl: SafeResourceUrl | string[] = [];
  cachedUserProfile = localStorage.getItem('user_profile');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly participantService: ParticipantService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if(state) {
      this.navigationLink = state['data']
    } else {
      if(this.cachedUserProfile) {
        const userProfile = JSON.parse(this.cachedUserProfile);
        if(userProfile.role.name === 'user') {
          this.navigationLink = `/participants/${this.id}/profile/personal`;
        } else {
          this.navigationLink = `/participants/${this.id}/detail`;
        }
      }
    }
  }

  ngOnInit(): void {
    const path = this.router.url;
    const fileTypes = [
      'sim-a',
      'sim-b',
      'ktp',
      'surat-sehat-buta-warna',
      'surat-bebas-narkoba'
    ];

    const matchedType = fileTypes.find(type => path.includes(type));

    if (matchedType) {
      this.pageTitle = matchedType.toUpperCase().split('-').join(' ');
      this.getFile(this.id!, matchedType);
    }
  }

  getFile(id: string, fileName: string): void {
    this.participantService.getFile({ id }, fileName).pipe(
      map(response => response.data)
    ).subscribe({
      next: (file) => {
        this.file = file;
        this.fileType = this.getMediaType(file);
        if (this.fileType === 'application/pdf') {
          this.renderPdfAsImages(file); // Render PDF sebagai gambar
        } else {
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.fileType};base64,${this.file}`);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private renderPdfAsImages(base64: string): void {
    const pdfData = atob(base64); // Decode base64 string
    const pdfUint8Array = new Uint8Array([...pdfData].map(char => char.charCodeAt(0)));

    pdfjsLib.getDocument({ data: pdfUint8Array }).promise.then(pdfDoc => {
      const pagesPromises = [];
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        pagesPromises.push(
          pdfDoc.getPage(i).then(page => this.renderPageAsImage(page))
        );
      }
      return Promise.all(pagesPromises);
    }).then(images => {
      this.safeUrl = images;
    }).catch(error => {
      console.error('Error rendering PDF:', error);
    });
  }

  private renderPageAsImage(page: any): string {
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    return page.render({ canvasContext: context, viewport }).promise.then(() => {
      return canvas.toDataURL('image/png'); // Menghasilkan gambar dari canvas
    });
  }

  private getMediaType(base64String: string): string {
    const header = base64String.slice(0, 4);
    if (header === 'iVBO') return 'image/png';
    if (header === '\uFFFD\uD8FF') return 'image/jpeg';
    if (header === 'JVBE') return 'application/pdf';
    return '';
  }
}
