import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-data-jumlah-pemegang-sertifikat',
  standalone: true,
  imports: [],
  templateUrl: './data-jumlah-pemegang-sertifikat.component.html',
  styleUrl: './data-jumlah-pemegang-sertifikat.component.css',
})
export class DataJumlahPemegangSertifikatComponent implements AfterViewInit {
  @ViewChild('jumlahPemegangSertifikat')
  private jumlahPemegangSertifikatRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const canvas = this.jumlahPemegangSertifikatRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['GMF', 'Non GMF'],
        datasets: [
          {
            data: [175, 21],
            backgroundColor: ['#09203f', '#2ca02c'],
            borderWidth: 0,
            rotation: 40,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white',
              font: {
                size: 16,
                family: 'Petrona',
              },
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          datalabels: {
            color: '#FFF',
            font: {
              family: 'Petrona',
              size: 20
            }
          },
          title: {
            display: true,
            text: 'Jumlah Pemegang Sertifikat',
            color: '#FFFFFF',
            font: {
              size: 30,
              family: 'Petrona',
            },
          },
        },
      },
    });
  }
}
