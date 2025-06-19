import { Routes } from '@angular/router';
import { HomeComponent } from './features/auth/home/home.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { EmailWasSentComponent } from './features/auth/email-was-sent/email-was-sent.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
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
