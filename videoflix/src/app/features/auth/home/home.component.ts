import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api-service/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  homeForm: FormGroup;
  errorVisible = false;

  /**
   * Initializes the HomeComponent with required services and sets up the form.
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
    this.homeForm = this.createForm();
  }

  /**
   * Creates the home form group with email andvalidates it.
   * @returns A FormGroup instance with validation rules
   */
  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Handles the form submission and logic flow.
   */
  async onSubmit() {
    const email = this.getEmailFromForm();
    if (!email) return;
    const result = await this.verifyEmail(email);
    this.handleVerificationResult(result, email);
  }

  /**
   * Retrieves the email value from the form.
   * @returns Email string or null
   */
  private getEmailFromForm(): string | null {
    const emailControl = this.homeForm.get('email');
    return emailControl?.value || null;
  }

  /**
   * Sends email to API for verification.
   * @param email Email address
   * @returns API result object
   */
  private async verifyEmail(email: string): Promise<any> {
    const formData = new FormData();
    formData.append('email', email);
    return await this.authService.postData('registration/', formData);
  }

  /**
   * Processes API result and acts accordingly.
   * @param result API response
   * @param email User's email address
   */
  private handleVerificationResult(result: any, email: string): void {
    if (result.status == 200) {
      console.log('status', result);
      localStorage.setItem('signUpEmail', email);
      this.router.navigate(['/sign-up'], { queryParams: { fromHome: '1' } });
    } else {
      console.log('status else', result);
      this.showErrorTemporarily();
    }
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
