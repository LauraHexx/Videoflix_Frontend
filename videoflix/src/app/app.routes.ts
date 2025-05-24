import { Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { HomeComponent } from './components/auth/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];
