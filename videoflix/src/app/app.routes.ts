import { Routes } from '@angular/router';
import { HomeComponent } from './components/auth/home/home.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { SignUpComponent } from './components/Auth/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
];
