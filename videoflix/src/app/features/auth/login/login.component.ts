import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorVisible = false;

  /**
   * Initializes the LoginComponent with required services and sets up the form.
   *
   * @param router - Angular Router for navigation
   * @param fb - FormBuilder service for creating reactive forms
   * @param apiService - Custom service to handle API communication
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.loginForm = this.createForm();
  }

  /**
   * Creates the login form group with email and password fields.
   * @returns A FormGroup instance with validation rules
   */
  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Toggles the visibility of the password input.
   * Called when the visibility icon is clicked.
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handles form submission for login.
   * Validates form and delegates login process.
   */
  onSubmit(): void {
    if (!this.loginForm.valid) return;
    const formData = this.buildFormData();
    this.sendLoginRequest(formData).subscribe({
      next: (response) => {
        if (response.status >= 200 && response.status < 300) {
          this.handleSuccess(response.body);
        } else {
          this.handleError(response);
        }
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  /**
   * Builds FormData object from login form values.
   */
  private buildFormData(): FormData {
    const formData = new FormData();
    formData.append('email', this.loginForm.value.email);
    formData.append('password', this.loginForm.value.password);
    return formData;
  }

  /**
   * Sends login POST request to the API.
   */
  private sendLoginRequest(formData: FormData): Observable<HttpResponse<any>> {
    return this.authService.login(formData);
  }

  /**
   * Handles successful login response.
   */
  private handleSuccess(data: any): void {
    console.log('handleSuccess called with data:', data);

    if (data && data.token) {
      this.authService.setAuthCredentials(data.token, data.user_id, data.email);
      this.router.navigate(['/media-home']);
    } else {
      console.error('Invalid response data:', data);
      this.handleError({ ok: false });
    }
  }

  /**
   * Handles login failure and shows error temporarily.
   */
  private handleError(result: any): void {
    this.showErrorTemporarily();
  }

  /**
   * Shows error and hides it after 3 seconds.
   */
  private showErrorTemporarily(): void {
    this.errorVisible = true;
    setTimeout(() => {
      this.errorVisible = false;
    }, 3000);
  }

  /**
   * Hides the error container by setting errorVisible to false.
   */
  hideError(): void {
    this.errorVisible = false;
  }
}
