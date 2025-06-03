import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParticipantListComponent } from './participant-list/participant-list.component';
import { AddParticipantDataComponent } from './add-participant-data/add-participant-data.component';
import { ParticipantDetailComponent } from './participant-detail/participant-detail.component';
import { EditParticipantDataComponent } from './edit-participant-data/edit-participant-data.component';
import { IdCardComponent } from './id-card/id-card.component';
import { DisplaysParticipantFilesComponent } from './displays-participants-files/displays-participant-file.component';

import { AuthGuard } from '../../shared/guard/auth.guard';
import { RoleGuard } from '../../shared/guard/role.guard';
import { DataCompleteGuard } from '../../shared/guard/data-complete.guard';

const routes: Routes = [
  {
    path: '', // Corresponds to 'participants'
    component: ParticipantListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: 'add', // Corresponds to 'participants/add'
    component: AddParticipantDataComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: ':participantId', // Corresponds to 'participants/:participantId'
    component: ParticipantDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: ':participantId/edit', // Corresponds to 'participants/:participantId/edit'
    component: EditParticipantDataComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu'] }
  },
  {
    path: ':participantId/id-card', // Corresponds to 'participants/:participantId/id-card'
    component: IdCardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: ':participantId/sim-b', // Corresponds to 'participants/:participantId/sim-b'
    component: DisplaysParticipantFilesComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: ':participantId/ktp', // Corresponds to 'participants/:participantId/ktp'
    component: DisplaysParticipantFilesComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: ':participantId/surat-sehat-buta-warna', // Corresponds to 'participants/:participantId/surat-sehat-buta-warna'
    component: DisplaysParticipantFilesComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  },
  {
    path: ':participantId/surat-bebas-narkoba', // Corresponds to 'participants/:participantId/surat-bebas-narkoba'
    component: DisplaysParticipantFilesComponent,
    canActivate: [AuthGuard, RoleGuard, DataCompleteGuard],
    data: { roles: ['super admin', 'supervisor', 'lcu', 'user'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule { }
