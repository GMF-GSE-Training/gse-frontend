import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RealisasiCotChartComponent } from './realisasi-cot-chart/realisasi-cot-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    RealisasiCotChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
