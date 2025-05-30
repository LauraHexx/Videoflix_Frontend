import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
  showFooter = false;

  /**
   * Initializes the component and updates the UI state based on the current URL.
   */
  constructor(private router: Router) {
    this.updateUIState();
  }

  /**
   * Updates the visibility of the footer based on the current URL.
   */
  private updateUIState(): void {
    const url = this.router.url.toLowerCase();
    this.showFooter = this.shouldShowFooter(url);
  }

  /**
   * Returns true if the footer should be shown.
   */
  private shouldShowFooter(url: string): boolean {
    return !(url.includes('privacy-policy') || url.includes('impressum'));
  }
}
