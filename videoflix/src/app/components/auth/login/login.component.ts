import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
