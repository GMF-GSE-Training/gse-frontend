import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapabilityRoutingModule } from './capability-routing.module';

import { CapabilityListComponent } from './capability-list/capability-list.component';
import { AddCapabilityComponent } from './add-capability/add-capability.component';
import { EditCapabilityComponent } from './edit-capability/edit-capability.component';
import { ViewCurriculumSyllabusComponent } from '../../pages/curriculum-syllabus/view-curriculum-syllabus/view-curriculum-syllabus.component';

@NgModule({
  imports: [
    CommonModule,
    CapabilityRoutingModule,
    CapabilityListComponent,
    AddCapabilityComponent,
    EditCapabilityComponent,
    ViewCurriculumSyllabusComponent,
  ]
})
export class CapabilityModule { }
