import { Routes } from '@angular/router';
import { HomeComponent } from './components/auth/home/home.component';
import { SignUpComponent } from './components/Auth/sign-up/sign-up.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { ForgotPasswordComponent } from './components/Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';
import { PrivacyPolicyComponent } from './components-sub/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
