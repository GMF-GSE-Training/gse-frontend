import { Component, Input } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";

@Component({
  selector: 'app-display-files',
  standalone: true,
  imports: [
    TitleComponent,
    WhiteButtonComponent
],
  templateUrl: './display-files.component.html',
  styleUrl: './display-files.component.css'
})
export class DisplayFilesComponent {
  @Input() pageTitle: string = '';
  @Input() navigationLinks: string = '';
}
