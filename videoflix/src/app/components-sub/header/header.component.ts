import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router'; // <- hier NavigationEnd importieren
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  showButton = false;
  showArrowBack = false;

  /**
   * Initializes the component, sets up router listener and UI state.
   */
  constructor(private router: Router, private location: Location) {
    this.updateUIState();
  }

  /**
   * Updates the visibility of buttons and arrows based on current URL.
   */
  private updateUIState(): void {
    const url = this.router.url.toLowerCase();

    this.showButton = this.shouldShowButton(url);
    this.showArrowBack = this.shouldShowArrowBack(url);
  }

  /**
   * Returns true if the main button should be shown.
   */
  private shouldShowButton(url: string): boolean {
    return !(
      url.includes('login') ||
      url.includes('privacy-policy') ||
      url.includes('imprint')
    );
  }

  /**
   * Determines if the back arrow should be shown.
   */
  private shouldShowArrowBack(url: string): boolean {
    return url.includes('privacy-policy') || url.includes('imprint');
  }

  /**
   * Navigates back to the previous page in the browser history.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Navigates to the login page when the login button is clicked.
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
