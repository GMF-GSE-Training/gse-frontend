import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewParticipantDataComponent } from './pages/participant/view-participant-data/view-participant-data.component';
import { ViewCapabilityComponent } from './pages/capability/view-capability/view-capability.component';
import { AddParticipantDataComponent } from './pages/participant/add-participant-data/add-participant-data.component';
import { DetailParticipantDataComponent } from './pages/participant/detail-participant-data/detail-participant-data.component';
import { EditParticipantDataComponent } from './pages/participant/edit-participant-data/edit-participant-data.component';
import { AddCapabilityComponent } from './pages/capability/add-capability/add-capability.component';
import { EditCapabilityComponent } from './pages/capability/edit-capability/edit-capability.component';
import { IdCardComponent } from './pages/participant/id-card/id-card.component';
import { AddCotComponent } from './pages/cot/add-cot/add-cot.component';
import { ViewCotComponent } from './pages/cot/view-cot/view-cot.component';
import { EditCotComponent } from './pages/cot/edit-cot/edit-cot.component';
import { DetailCotComponent } from './pages/cot/detail-cot/detail-cot.component';
import { CotFinishComponent } from './pages/cot/cot-finish/cot-finish.component';
import { CreateSertifikatComponent } from './pages/cot/create-sertifikat/create-sertifikat.component';
import { AddParticipantCotComponent } from './pages/cot/add-participant-cot/add-participant-cot.component';
import { DownloadSertifikatComponent } from './pages/cot/download-sertifikat/download-sertifikat.component';
import { ViewUsersComponent } from './pages/users/view-users/view-users.component';
import { AddUserComponent } from './pages/users/add-user/create-account.component';
import { AddSignComponent } from './pages/sign/add-sign/view-sign.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { ViewSignComponent } from './pages/sign/view-sign/view-sign.component';
import { EditSignComponent } from './pages/sign/edit-sign/edit-sign.component';
import { ViewCurriculumSyllabusComponent } from './pages/curriculum-syllabus/view-curriculum-syllabus/view-curriculum-syllabus.component';
import { AddCurriculumCapabilityComponent } from './pages/capability/add-curriculum-capability/add-curriculum-capability.component';
import { AddCurriculumComponent } from './pages/curriculum-syllabus/add-curriculum/add-curriculum.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './shared/guard/auth.guard';
import { DisplayFilesComponent } from './pages/participant/display-files/display-files.component';
import { guestGuard } from './shared/guard/guest.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
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
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'participants',
    component: ViewParticipantDataComponent,
    canActivate: [authGuard],
  },
  {
    path: 'participants/add',
    component: AddParticipantDataComponent,
    canActivate: [authGuard],
  },
  {
    path: 'participants/:id/view',
    component: DetailParticipantDataComponent,
    canActivate: [authGuard]
  },
  {
    path: 'participants/:id/id-card',
    component: IdCardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'participants/:id/edit',
    component: EditParticipantDataComponent,
    canActivate: [authGuard],
  },
  {
    path: 'participants/:id/:file-name',
    component: DisplayFilesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'capability',
    component: ViewCapabilityComponent,
    canActivate: [authGuard],
  },
  {
    path: 'capability/add',
    component: AddCapabilityComponent,
    canActivate: [authGuard],
  },
  {
    path: 'capability/:id/edit',
    component: EditCapabilityComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cot',
    component: ViewCotComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cot/add',
    component: AddCotComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cot/:id/edit',
    component: EditCotComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cot/:id/view',
    component: DetailCotComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cot/finish',
    component: CotFinishComponent,
    canActivate: [authGuard],
  },
  {
    path: 'participant-cot/add',
    component: AddParticipantCotComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sertifikat',
    component: CreateSertifikatComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sertifikat/download',
    component: DownloadSertifikatComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: ViewUsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/add',
    component: AddUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/:id/edit',
    component: EditUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sign/add',
    component: AddSignComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sign',
    component: ViewSignComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sign/:id/edit',
    component: EditSignComponent,
    canActivate: [authGuard],
  },
  {
    path: 'curriculum',
    component: ViewCurriculumSyllabusComponent,
    canActivate: [authGuard],
  },
  {
    path: 'curriculum/capability',
    component: AddCurriculumCapabilityComponent,
    canActivate: [authGuard],
  },
  {
    path: 'curriculum/add',
    component: AddCurriculumComponent,
    canActivate: [authGuard],
  }
];
