import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ESignRoutingModule } from './e-sign-routing.module';
// import { SignatureListComponent } from './pages/signature-list/signature-list.component';
// import { AddSignComponent } from './pages/add-sign/add-sign.component';
// import { EditSignComponent } from './pages/edit-sign/edit-sign.component';
// import { DisplaysSignatureFileComponent } from './pages/displays-signature-file/displays-signature-file.component';
// import { ESignFormComponent } from './components/e-sign-form/e-sign-form.component';

@NgModule({
  declarations: [
    // SignatureListComponent,
    // AddSignComponent,
    // EditSignComponent,
    // DisplaysSignatureFileComponent,
    // ESignFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ESignRoutingModule,
    // Import standalone components that are used in routes
    // AddSignComponent,
    // SignatureListComponent,
    // EditSignComponent,
    // DisplaysSignatureFileComponent
  ]
})
export class ESignModule { }
