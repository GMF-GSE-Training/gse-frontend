import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleComponent } from "../../components/title/title.component";

@Component({
  selector: 'app-display-files',
  standalone: true,
  imports: [
    RouterLink,
    TitleComponent
],
  templateUrl: './display-files.component.html',
  styleUrl: './display-files.component.css'
})
export class DisplayFilesComponent {
  @Input() pageTitle: string = '';
  navigationLinks: string = '';
}
