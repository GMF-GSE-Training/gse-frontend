import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

// Standalone Auth Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AccountVerificationComponent } from './pages/account-verification/account-verification.component';

// Import any Angular Material modules used by these components
// For example:
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    // Import standalone components directly into the 'imports' array
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AccountVerificationComponent,
    // Add Angular Material modules here if they are used
    // MatCardModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatButtonModule,
    // MatIconModule,
  ],
  // No 'declarations' array is needed as all imported components are standalone
})
export class AuthModule { }
