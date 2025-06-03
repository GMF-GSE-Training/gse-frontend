import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Likely needed for add/edit forms
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from '../../shared/guard/auth.guard';
import { RoleGuard } from '../../shared/guard/role.guard';
import { DataCompleteGuard } from '../../shared/guard/data-complete.guard';

// Define routes here to avoid import issue
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/cot-list/cot-list.component').then(m => m.CotListComponent),
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/add-cot/add-cot.component').then(m => m.AddCotComponent),
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./pages/edit-cot/edit-cot.component').then(m => m.EditCotComponent),
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/cot-detail/cot-detail.component').then(m => m.CotDetailComponent),
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'certificate/:id',
    loadChildren: () => import('./pages/create-certificate/create-certificate.component').then(m => m.CreateCertificateComponent),
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  }
];

// Create routing module class here directly
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotRoutingModule { }

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CotRoutingModule
  ]
})
export class CotModule { }
