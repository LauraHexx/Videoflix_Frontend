import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  /**
   * Navigates to the Sign Up page.
   */
  goToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
