import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CurriculumSyllabusRoutingModule } from './curriculum-syllabus-routing.module';

// Standalone Components
import { AddCurriculumComponent } from './pages/add-curriculum/add-curriculum.component';
import { EditCurriculumSyllabusComponent } from './pages/edit-curriculum-syllabus/edit-curriculum-syllabus.component';
import { ViewCurriculumSyllabusComponent } from './pages/view-curriculum-syllabus/view-curriculum-syllabus.component';

// Import any Angular Material or other shared modules used by these components

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurriculumSyllabusRoutingModule,
    // Import standalone components
    AddCurriculumComponent,
    EditCurriculumSyllabusComponent,
    ViewCurriculumSyllabusComponent,
    // Add Angular Material or other shared modules here
  ],
})
export class CurriculumSyllabusModule { }
