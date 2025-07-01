import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
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
  isMediaHome = false;
  headerOpacity = 0;
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
   * Listens to scroll events and updates header background opacity.
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isMediaHome) {
      const scrollPosition = window.scrollY;
      const maxScroll = 58; // 58px threshold

      if (scrollPosition <= maxScroll) {
        this.headerOpacity = scrollPosition / maxScroll;
      } else {
        this.headerOpacity = 1;
      }
    } else {
      this.headerOpacity = 0;
    }
  }

  /**
   * Sets visibility for login button and back arrow based on route.
   */
  private updateUIState(url: string): void {
    this.showButton = this.shouldShowButton(url);
    this.showArrowBack = this.shouldShowArrowBack(url);
    this.isMediaHome = this.isMediaHomePage(url);

    // Reset opacity when route changes
    if (!this.isMediaHome) {
      this.headerOpacity = 0;
    }
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

  private isMediaHomePage(url: string): boolean {
    return url.includes('media-home');
  }

  /**
   * Gets the header background color based on current opacity.
   */
  getHeaderBackgroundColor(): string {
    if (this.headerOpacity === 0) {
      return 'transparent';
    }

    const alpha = this.headerOpacity;
    return `linear-gradient(
      to bottom,
      rgba(20, 20, 20, ${alpha * 1}) 0%,
      rgba(20, 20, 20, ${alpha * 0.99}) 10%,
      rgba(20, 20, 20, ${alpha * 0.98}) 20%,
      rgba(20, 20, 20, ${alpha * 0.97}) 60%,
      rgba(20, 20, 20, ${alpha * 0.96}) 80%,
      rgba(20, 20, 20, 0) 100%
    )`;
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
