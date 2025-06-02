import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  showButton = false;
  showArrowBack = false;
  private subscription!: Subscription;

  constructor(private router: Router, private location: Location) {}

  /**
   * Subscribes to route changes and updates button visibility.
   */
  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.toLowerCase();
        this.updateUIState(url);
      });

    // Initial aufrufen
    this.updateUIState(this.router.url.toLowerCase());
  }

  /**
   * Sets visibility for login button and back arrow based on route.
   */
  private updateUIState(url: string): void {
    this.showButton = this.shouldShowButton(url);
    this.showArrowBack = this.shouldShowArrowBack(url);
  }

  private shouldShowButton(url: string): boolean {
    return !(
      url.includes('login') ||
      url.includes('privacy-policy') ||
      url.includes('imprint')
    );
  }

  private shouldShowArrowBack(url: string): boolean {
    return url.includes('privacy-policy') || url.includes('imprint');
  }

  /**
   * Navigates one step back in browser history.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Navigates to login page.
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Cleans up router subscription on destroy.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
