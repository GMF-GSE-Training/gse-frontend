import { Component } from '@angular/core';
import { StatusPageComponent } from "../../../components/status-page/status-page.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [StatusPageComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
