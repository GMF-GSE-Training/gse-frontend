import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { ParticipantService } from '../../../shared/service/participant.service';
import { DisplayFilesComponent } from '../../../contents/display-files/display-files.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoaderComponent } from "../../../components/loader/loader.component";

@Component({
  selector: 'app-display-participants-files',
  standalone: true,
  imports: [
    DisplayFilesComponent,
    RouterLink,
    CommonModule,
    LoaderComponent
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
  safeUrl: SafeResourceUrl | string = '';
  cachedUserProfile = localStorage.getItem('user_profile');
  isLoading: boolean = false;

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
    this.isLoading = true;
    this.participantService.getFile({ id }, fileName).pipe(
      map(response => response.data),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (file) => {
        this.file = file;
        this.fileType = this.getMediaType(file);

        if (this.fileType === 'application/pdf') {
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.fileType};base64,${file}#toolbar=0`);
        } else {
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.fileType};base64,${file}`);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onImageLoad() {
    console.log("LOADING")
    this.isLoading = false;
  }

  onImageError() {
    console.error('Failed to load image:', this.safeUrl);
    this.isLoading = false; // Hindari spinner terus tampil
  }

  private getMediaType(base64String: string): string {
    const header = base64String.slice(0, 4);
    if (header === 'iVBO') return 'image/png';
    if (header === '\uFFFD\uD8FF') return 'image/jpeg';
    if (header === 'JVBE') return 'application/pdf';
    return '';
  }
}
