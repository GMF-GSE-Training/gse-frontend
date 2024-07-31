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

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'participant-data',
    component: ViewParticipantDataComponent
  },
  {
    path: 'capability',
    component: ViewCapabilityComponent
  },
  {
    path: 'add-participant-data',
    component: AddParticipantDataComponent
  },
  {
    path: 'detail-participant-data',
    component: DetailParticipantDataComponent
  },
  {
    path: 'id-participant-data',
    component: IdCardComponent
  },
  {
    path: 'edit-participant-data',
    component: EditParticipantDataComponent
  },
  {
    path: 'add-capability',
    component: AddCapabilityComponent
  },
  {
    path: 'edit-capability',
    component: EditCapabilityComponent
  },
  {
    path: 'add-cot',
    component: AddCotComponent
  },
  {
    path: 'cot',
    component: ViewCotComponent
  },
  {
    path: 'edit-cot',
    component: EditCotComponent
  },
  {
    path: 'detail-cot',
    component: DetailCotComponent
  },
  {
    path: 'cot-finish',
    component: CotFinishComponent
  },
  {
    path: 'add-participant-cot',
    component: AddParticipantCotComponent
  },
  {
    path: 'create-sertifikat',
    component: CreateSertifikatComponent
  },
  {
    path: 'download-sertifikat',
    component: DownloadSertifikatComponent
  },
  {
    path: 'users',
    component: ViewUsersComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
];
