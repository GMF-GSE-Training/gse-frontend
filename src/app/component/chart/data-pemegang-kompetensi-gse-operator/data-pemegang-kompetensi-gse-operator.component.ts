import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-data-pemegang-kompetensi-gse-operator',
  standalone: true,
  imports: [],
  templateUrl: './data-pemegang-kompetensi-gse-operator.component.html',
  styleUrl: './data-pemegang-kompetensi-gse-operator.component.css'
})
export class DataPemegangKompetensiGseOperatorComponent implements AfterViewInit {
  @ViewChild('dataPemegangKompetensiGSEOperator') private dataPemegangKompetensiGseOperatorRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const canvas = this.dataPemegangKompetensiGseOperatorRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Eks', 'TB', 'TC', 'TF', 'TJ', 'TL', 'TM', 'TR', 'TU', 'TV', 'TZ'],
        datasets: [
          {
            label: 'GMF',
            data: [0, 63, 3, 10, 23, 43, 5, 2, 4, 4, 13],
            backgroundColor: '#02507E',
            stack: 'Stack 0',
            barThickness: 35
          },
          {
            label: 'Non GMF',
            data: [5, 0, 8, 0, 2, 0, 5, 0, 3, 1, 2],
            backgroundColor: '#2C844F',
            stack: 'Stack 0',
            barThickness: 35
          },
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
            display: function(context) {
              return context.dataset.data[context.dataIndex] !== 0;
            }
          },
          title: {
            display: true,
            text: 'Data Pemegang Kompetensi GSE Operator',
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
