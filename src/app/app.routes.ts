import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { guestGuard } from './shared/guard/guest.guard';
import { RoleGuard } from './shared/guard/role.guard';
import { DataCompleteGuard } from './shared/guard/data-complete.guard';

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
    loadChildren: () => import('./features/cot/cot.module').then(m => m.CotModule),
    canActivate: [AuthGuard], // Role guards are now in cot-routing.module.ts
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard], // Role guards are now in users-routing.module.ts
  },
  {
    path: 'e-sign',
    loadChildren: () => import('./features/e-sign/e-sign.module').then(m => m.ESignModule),
    canActivate: [AuthGuard], // Role guards are now in e-sign-routing.module.ts
  },
  {
    path: 'curriculum-syllabus',
    loadChildren: () => import('./features/curriculum-syllabus/curriculum-syllabus.module').then(m => m.CurriculumSyllabusModule),
    canActivate: [AuthGuard], // Role guards are now in curriculum-syllabus-routing.module.ts
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
