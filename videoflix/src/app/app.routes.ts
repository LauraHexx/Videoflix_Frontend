import { Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
];
