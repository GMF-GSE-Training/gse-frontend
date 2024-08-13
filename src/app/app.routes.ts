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

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'participant',
    component: ViewParticipantDataComponent
  },
  {
    path: 'participant/add',
    component: AddParticipantDataComponent
  },
  {
    path: 'participant/view',
    component: DetailParticipantDataComponent
  },
  {
    path: 'participant/id-card',
    component: IdCardComponent
  },
  {
    path: 'participant/edit',
    component: EditParticipantDataComponent
  },
  {
    path: 'capability',
    component: ViewCapabilityComponent
  },
  {
    path: 'capability/add',
    component: AddCapabilityComponent
  },
  {
    path: 'capability/edit',
    component: EditCapabilityComponent
  },
  {
    path: 'cot',
    component: ViewCotComponent
  },
  {
    path: 'cot/add',
    component: AddCotComponent
  },
  {
    path: 'cot/edit',
    component: EditCotComponent
  },
  {
    path: 'cot/view',
    component: DetailCotComponent
  },
  {
    path: 'cot/finish',
    component: CotFinishComponent
  },
  {
    path: 'participant/add',
    component: AddParticipantCotComponent
  },
  {
    path: 'sertifikat',
    component: CreateSertifikatComponent
  },
  {
    path: 'sertifikat/download',
    component: DownloadSertifikatComponent
  },
  {
    path: 'users',
    component: ViewUsersComponent
  },
  {
    path: 'users/add',
    component: AddUserComponent
  },
  {
    path: 'users/edit',
    component: EditUserComponent
  },
  {
    path: 'sign/add',
    component: AddSignComponent
  },
  {
    path: 'sign',
    component: ViewSignComponent
  },
  {
    path: 'sign/edit',
    component: EditSignComponent
  },
  {
    path: 'curriculum',
    component: ViewCurriculumSyllabusComponent
  },
  {
    path: 'curriculum/capability',
    component: AddCurriculumCapabilityComponent
  },
  {
    path: 'curriculum/add',
    component: AddCurriculumComponent
  }
];
