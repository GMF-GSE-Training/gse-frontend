import { Routes } from '@angular/router';
import { AddCotComponent } from './pages/cot/add-cot/add-cot.component';
import { CotListComponent } from './pages/cot/cot-list/cot-list.component';
import { EditCotComponent } from './pages/cot/edit-cot/edit-cot.component';
import { CotDetailComponent } from './pages/cot/cot-detail/cot-detail.component';
import { CreateCertificateComponent } from './pages/cot/create-certificate/create-certificate.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { AddSignComponent } from './pages/sign/add-sign/add-sign.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { SignatureListComponent } from './pages/sign/signature-list/signature-list.component';
import { EditSignComponent } from './pages/sign/edit-sign/edit-sign.component';
import { AddCurriculumComponent } from './pages/curriculum-syllabus/add-curriculum/add-curriculum.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { guestGuard } from './shared/guard/guest.guard';
import { ViewCurriculumSyllabusComponent } from './pages/curriculum-syllabus/view-curriculum-syllabus/view-curriculum-syllabus.component';
import { EditCurriculumSyllabusComponent } from './pages/curriculum-syllabus/edit-curriculum-syllabus/edit-curriculum-syllabus.component';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { RoleGuard } from './shared/guard/role.guard';
import { DataCompleteGuard } from './shared/guard/data-complete.guard';
import { DisplaysSignatureFileComponent } from './pages/sign/displays-signature-file/displays-signature-file.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'auth', // Base path for all authentication routes
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    // Guards and data are now in dashboard-routing.module.ts
  },
  {
    path: 'participants',
    loadChildren: () => import('./features/participant/participant.module').then(m => m.ParticipantModule),
    canActivate: [AuthGuard], // RoleGuards are handled within ParticipantRoutingModule
  },
  {
    path: 'capability',
    loadChildren: () => import('./features/capability/capability.module').then(m => m.CapabilityModule),
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'cot',
    component: CotListComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'cot/add',
    component: AddCotComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'cot/:cotId/edit',
    component: EditCotComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'cot/:cotId/detail',
    component: CotDetailComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'certificate/:cotId/create/:participantId',
    component: CreateCertificateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor'] }
  },
  {
    path: 'users/add',
    component: AddUserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: 'users/:userId/edit',
    component: EditUserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'users/:userId/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: 'users/:userId/account',
    component: ProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: 'e-sign/add',
    component: AddSignComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'e-sign',
    component: SignatureListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor'] }
  },
  {
    path: 'e-sign/:eSignId/edit',
    component: EditSignComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'e-sign/:eSignId/view',
    component: DisplaysSignatureFileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'curriculum-syllabus/add',
    component: AddCurriculumComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'curriculum-syllabus/:capabilityId/edit',
    component: EditCurriculumSyllabusComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
