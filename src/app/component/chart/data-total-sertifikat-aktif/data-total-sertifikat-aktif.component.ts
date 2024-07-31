import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-data-total-sertifikat-aktif',
  standalone: true,
  imports: [],
  templateUrl: './data-total-sertifikat-aktif.component.html',
  styleUrl: './data-total-sertifikat-aktif.component.css'
})
export class DataTotalSertifikatAktifComponent implements AfterViewInit {
  @ViewChild('totalSertifikatAktif') private totalSertifikatAktifRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const canvas = this.totalSertifikatAktifRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const dataValues = [3, 7, 6, 5, 9, 8, 3, 4, 4, 9, 7, 5, 8];
    const totalSertifikatAktif = dataValues.reduce((acc, curr) => acc + curr, 0);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['FLT', 'GPS', 'WSS', 'WMT', 'AWT', 'GSE', 'ACS', 'ATT', 'BTT', 'RDS', 'LSS', 'ASS', 'TBL'],
        datasets: [
          {
            data: dataValues,
            backgroundColor: '#003D61',
            stack: 'Stack 0',
            barThickness: 35,
            label: `${totalSertifikatAktif}`,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 20,
              boxHeight: 20,
              padding: 20,
              color: '#FFFFFF',
              font: {
                family: 'Petrona',
                size: 50
              },
              usePointStyle: true,
              pointStyle: 'circle',
            }
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
            text: 'Total Sertifikat aktif',
            color: '#FFFFFF',
            font: {
              size: 30,
              family: 'Petrona'
            },
            padding: {
              bottom: 20
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
      },
    });
  }
}
