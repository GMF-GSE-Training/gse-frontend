import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// E-Sign Components
import { AddSignComponent } from './pages/add-sign/add-sign.component';
import { SignatureListComponent } from './pages/signature-list/signature-list.component';
import { EditSignComponent } from './pages/edit-sign/edit-sign.component';
import { DisplaysSignatureFileComponent } from './pages/displays-signature-file/displays-signature-file.component';

// Guards
import { AuthGuard } from '../../shared/guard/auth.guard';
import { RoleGuard } from '../../shared/guard/role.guard';
import { DataCompleteGuard } from '../../shared/guard/data-complete.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ESignRoutingModule { }
