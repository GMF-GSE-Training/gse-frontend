import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ViewParticipantDataComponent } from './view-participant-data/view-participant-data.component';
import { ViewCapabilityComponent } from './view-capability/view-capability.component';

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
  }
];
