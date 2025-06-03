import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ESignRoutingModule } from './e-sign-routing.module';

// Standalone E-Sign Components
import { AddSignComponent } from './pages/add-sign/add-sign.component';
import { SignatureListComponent } from './pages/signature-list/signature-list.component';
import { EditSignComponent } from './pages/edit-sign/edit-sign.component';
import { DisplaysSignatureFileComponent } from './pages/displays-signature-file/displays-signature-file.component';

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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ESignRoutingModule,
    // Import standalone components
    AddSignComponent,
    SignatureListComponent,
    EditSignComponent,
    DisplaysSignatureFileComponent,
    // Add Angular Material or other shared modules here
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatButtonModule,
    // MatIconModule,
    // MatCardModule,
  ],
})
export class ESignModule { }
