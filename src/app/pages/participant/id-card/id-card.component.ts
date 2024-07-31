import { Component } from '@angular/core';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import html2canvas from 'html2canvas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [
    NavbarComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
  ],
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.css',
})
export class IdCardComponent {
  print() {
    const idCard = document.getElementById('idCard');
    if (idCard) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write('<html><head><title>ID Card</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 3px #5E8EAA solid;
          width: 464px;
          height: 566px;
          box-sizing: border-box;
        }

        .header {
          display: flex;
          justify-content: center;
          width: 100%;
          margin: 0;
          padding-top: 10px;
          padding-bottom: 10px;
          border-bottom: 3px solid #5E8EAA;
        }

        .header img {
          width: 370px;
          height: 75px;
        }

        .logo {
          width: 200px;
        }

        .profile-section {
          display: flex;
          align-items: center;
          margin-left: 40px;
          margin-top: 90px;
          width: 100%;
        }

        .profile-picture {
          width: 151px;
          height: 191px;
          margin-right: 20px;
        }

        .info {
          text-align: left;
        }

        .barcode-section {
          margin-top: 65px;
          margin-left: 315px;
        }

        .barcode {
          width: 117px;
          height: 106px;
        }
        `);
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(idCard.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  }

  download() {
    const idCard = document.getElementById('idCard');
    if (idCard) {
      html2canvas(idCard).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'id-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  }
}
