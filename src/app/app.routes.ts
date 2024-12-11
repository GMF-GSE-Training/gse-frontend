import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ParticipantListComponent } from './pages/participant/participant-list/participant-list.component';
import { CapabilityListComponent } from './pages/capability/capability-list/capability-list.component';
import { AddParticipantDataComponent } from './pages/participant/add-participant-data/add-participant-data.component';
import { ParticipantDetailComponent } from './pages/participant/participant-detail/participant-detail.component';
import { EditParticipantDataComponent } from './pages/participant/edit-participant-data/edit-participant-data.component';
import { AddCapabilityComponent } from './pages/capability/add-capability/add-capability.component';
import { EditCapabilityComponent } from './pages/capability/edit-capability/edit-capability.component';
import { IdCardComponent } from './pages/participant/id-card/id-card.component';
import { AddCotComponent } from './pages/cot/add-cot/add-cot.component';
import { CotListComponent } from './pages/cot/cot-list/cot-list.component';
import { EditCotComponent } from './pages/cot/edit-cot/edit-cot.component';
import { CotDetailComponent } from './pages/cot/cot-detail/cot-detail.component';
import { CreateSertifikatComponent } from './pages/cot/create-sertifikat/create-sertifikat.component';
import { DownloadSertifikatComponent } from './pages/cot/download-sertifikat/download-sertifikat.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { AddSignComponent } from './pages/sign/add-sign/add-sign.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { SignatureListComponent } from './pages/sign/signature-list/signature-list.component';
import { EditSignComponent } from './pages/sign/edit-sign/edit-sign.component';
import { AddCurriculumComponent } from './pages/curriculum-syllabus/add-curriculum/add-curriculum.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { DisplayFilesParticipantsComponent } from './pages/participant/display-files-participants/display-files-participants.component';
import { guestGuard } from './shared/guard/guest.guard';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { CapabilityDetailComponent } from './pages/capability/capability-detail/capability-detail.component';
import { EditCurriculumSyllabusComponent } from './pages/curriculum-syllabus/edit-curriculum-syllabus/edit-curriculum-syllabus.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { RoleGuard } from './shared/guard/role.guard';
import { DataCompleteGuard } from './shared/guard/data-complete.guard';
import { AccountVerificationComponent } from './pages/auth/account-verification/account-verification.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'password-reset',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'verification',
    component: AccountVerificationComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'participants',
    component: ParticipantListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: 'participants/add',
    component: AddParticipantDataComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu',] }
  },
  {
    path: 'participants/:id/detail',
    component: ParticipantDetailComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'participants/:id/id-card',
    component: IdCardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'participants/:id/edit',
    component: EditParticipantDataComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'lcu', 'user'] }
  },
  {
    path: 'participants/:id/sim-a',
    component: DisplayFilesParticipantsComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'participants/:id/sim-b',
    component: DisplayFilesParticipantsComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'participants/:id/ktp',
    component: DisplayFilesParticipantsComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'participants/:id/surat-sehat-buta-warna',
    component: DisplayFilesParticipantsComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'participants/:id/surat-bebas-narkoba',
    component: DisplayFilesParticipantsComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'capability',
    component: CapabilityListComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'capability/add',
    component: AddCapabilityComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'capability/:id/edit',
    component: EditCapabilityComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'capability/:id/detail',
    component: CapabilityDetailComponent,
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
    path: 'cot/:id/edit',
    component: EditCotComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'cot/:id/detail',
    component: CotDetailComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'sertifikat/:id',
    component: CreateSertifikatComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'sertifikat/:id/download',
    component: DownloadSertifikatComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: 'users/add',
    component: AddUserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: 'users/:id/edit',
    component: EditUserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'lcu'] }
  },
  {
    path: 'users/:id/profile',
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
    path: 'e-sign/:id/edit',
    component: EditSignComponent,
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
    path: 'curriculum-syllabus/:id/edit',
    component: EditCurriculumSyllabusComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
