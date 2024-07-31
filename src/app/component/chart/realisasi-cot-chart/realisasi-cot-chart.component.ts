import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-realisasi-cot-chart',
  standalone: true,
  imports: [],
  templateUrl: './realisasi-cot-chart.component.html',
  styleUrl: './realisasi-cot-chart.component.css'
})
export class RealisasiCotChartComponent implements AfterViewInit {
  @ViewChild('realisasiCotChart') private realisasiCotChartRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const canvas = this.realisasiCotChartRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
          {
            label: 'Open',
            data: [3, 5, 6, 2, 6, 4, 7, 2, 8, 6, 5, 9],
            backgroundColor: '#3C6735',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'Cancel',
            data: [4, 2, 9,   3, 7, 7, 5, 8, 2, 9, 6, 4],
            backgroundColor: '#FF0000',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'Finish',
            data: [3, 2, 6, 4, 7, 8, 6, 3, 8, 5, 7, 9],
            backgroundColor: '#FFB800',
            stack: 'Stack 0',
            barThickness: 35,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 20,
              boxHeight: 20,
              padding: 20,
              color: '#FFFFFF',
              font: {
                family: 'Petrona'
              }
            }
          },
          datalabels: {
            color: '#FFF',
            font: {
              family: 'Petrona',
              size: 20
            },
          },
          title: {
            display: true,
            text: 'Realisasi COT 2024',
            color: '#FFFFFF',
            font: {
              size: 30,
              family: 'Petrona'
            },
            padding: {
              top: 5,
              bottom: 5
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: '#000',
              font: {
                size: 15,
                family: 'Petrona'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#000',
              font: {
                size: 15,
                family: 'Petrona'
              },
            },
            grid: {
              color: '#000',
              lineWidth: 2
            }
          }
        }
      }
    });
  }
}
