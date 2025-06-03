import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Likely needed for add/edit forms

import { CotRoutingModule } from './cot-routing.module';

// Standalone COT Components (now in ./pages/)
import { AddCotComponent } from './pages/add-cot/add-cot.component';
import { CotListComponent } from './pages/cot-list/cot-list.component';
import { EditCotComponent } from './pages/edit-cot/edit-cot.component';
import { CotDetailComponent } from './pages/cot-detail/cot-detail.component';
import { CreateCertificateComponent } from './pages/create-certificate/create-certificate.component';

// Import any Angular Material or other shared modules used by these components
// For example:
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CotRoutingModule,
    // Import standalone components
    AddCotComponent,
    CotListComponent,
    EditCotComponent,
    CotDetailComponent,
    CreateCertificateComponent,
    // Add Angular Material or other shared modules here
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatButtonModule,
    // MatIconModule,
    // MatCardModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
  ],
})
export class CotModule { }
