import { Routes } from '@angular/router';
import { HomeComponent } from './features/auth/home/home.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { RegisterSuccessComponent } from './features/auth/register-success/register-success.component';
import { EmailWasSentComponent } from './features/auth/email-was-sent/email-was-sent.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { PrivacyPolicyComponent } from './features/legal/privacy-policy/privacy-policy.component';
import { ImprintComponent } from './features/legal/imprint/imprint.component';
import { MediaHomeComponent } from './features/main/componentes/media-home/media-home.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/auth.guard';
import { VideoPlayerComponent } from './features/main/componentes/video-player/video-player.component';
import { VideoDetailComponent } from './features/main/componentes/video-detail/video-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [noAuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [noAuthGuard] },
  {
    path: 'media-home',
    component: MediaHomeComponent,
    canActivate: [authGuard],
  },
  { path: 'sign-up', component: SignUpComponent, canActivate: [noAuthGuard] },
  {
    path: 'success-register',
    component: RegisterSuccessComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'email-was-sent',
    component: EmailWasSentComponent,
    canActivate: [noAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [noAuthGuard],
  },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'imprint', component: ImprintComponent },
  {
    path: 'video/:id',
    component: VideoPlayerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'video-detail/:id',
    component: VideoDetailComponent,
    canActivate: [authGuard],
  },
];
