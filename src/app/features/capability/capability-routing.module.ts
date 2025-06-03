import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Import paths will need to be adjusted once components are moved
import { CapabilityListComponent } from './capability-list/capability-list.component';
import { AddCapabilityComponent } from './add-capability/add-capability.component';
import { EditCapabilityComponent } from './edit-capability/edit-capability.component';
import { ViewCurriculumSyllabusComponent } from '../../pages/curriculum-syllabus/view-curriculum-syllabus/view-curriculum-syllabus.component';
import { DataCompleteGuard } from '../../shared/guard/data-complete.guard';
import { RoleGuard } from '../../shared/guard/role.guard';
import { AuthGuard } from '../../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CapabilityListComponent,
    // Note: Main route guards are handled in app.routes.ts for the parent 'capability' path
  },
  {
    path: 'add',
    component: AddCapabilityComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: ':capabilityId/edit',
    component: EditCapabilityComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['super admin'] }
  },
  {
    path: ':capabilityId/curriculum-syllabus',
    component: ViewCurriculumSyllabusComponent,
    // Guards for this specific sub-route if different from parent or if more specific needed
    // For now, assuming parent guards cover this, or specific guards are added if necessary
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapabilityRoutingModule { }
