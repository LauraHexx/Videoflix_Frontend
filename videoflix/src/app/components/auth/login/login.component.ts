import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../shared/services/api.service';

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
    private apiService: ApiService
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
  async onSubmit(): Promise<void> {
    if (!this.loginForm.valid) return;

    const formData = this.buildFormData();
    const result = await this.sendLoginRequest(formData);

    if (result.ok) {
      this.handleSuccess(result.data);
    } else {
      this.handleError(result);
    }
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
  private async sendLoginRequest(formData: FormData) {
    return await this.apiService.postData('login/', formData);
  }

  /**
   * Handles successful login response.
   */
  private handleSuccess(data: any): void {
    this.apiService.setAuthCredentials(data.token, data.user_id, data.email);
    // TODO: Implement logic to redirect user to the videos page - change "home"
    this.router.navigate(['/home']);
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
