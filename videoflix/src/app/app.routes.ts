import { Routes } from '@angular/router';
import { HomeComponent } from './components/auth/home/home.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { EmailWasSentComponent } from './components/auth/email-was-sent/email-was-sent.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { PrivacyPolicyComponent } from './features/legal/privacy-policy/privacy-policy.component';
import { ImprintComponent } from './features/legal/imprint/imprint.component';
import { MediaHomeComponent } from './features/main/componentes/media-home/media-home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'media-home', component: MediaHomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'email-was-sent', component: EmailWasSentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'imprint', component: ImprintComponent },
];
