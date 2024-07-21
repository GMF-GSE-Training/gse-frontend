import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RelasiCotChartComponent } from './relasi-cot-chart/relasi-cot-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    RelasiCotChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
