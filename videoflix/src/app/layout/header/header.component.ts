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
import { AuthService } from '../../features/auth/services/auth.service';

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
  isVideoPlayer = false;
  headerOpacity = 0;
  private subscription!: Subscription;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

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
    this.updateUIState(this.router.url.toLowerCase());
  }

  public checkIfLoggedIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('auth-token') != undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Listens to scroll events and updates header background opacity.
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    const maxScroll = 58; // 58px threshold

    if (scrollPosition <= maxScroll) {
      this.headerOpacity = scrollPosition / maxScroll;
    } else {
      this.headerOpacity = 1;
    }
  }

  /**
   * Sets visibility for login button and back arrow based on route.
   */
  private updateUIState(url: string): void {
    this.isVideoPlayer = url.startsWith('/video/');
    this.showButton = this.shouldShowButton(url);
    this.showArrowBack = this.shouldShowArrowBack(url);
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
      rgba(20, 20, 20, ${alpha * 0.99}) 20%,
      rgba(20, 20, 20, ${alpha * 0.98}) 60%,
      rgba(20, 20, 20, ${alpha * 0.97}) 70%,
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
   * Gets the button text based on localStorage state.
   */
  getButtonText(): string {
    return this.checkIfLoggedIn() ? 'Log Out' : 'Log in';
  }

  getLogoImage(): string {
    return this.checkIfLoggedIn() ? '/imgs/logo-no-text.svg' : '/imgs/logo.png';
  }

  /**
   * Handles button click - login or logout based on localStorage state.
   */
  handleButtonClick(): void {
    if (this.checkIfLoggedIn()) {
      this.logout();
    } else {
      this.goToLogin();
    }
  }

  /**
   * Performs logout by clearing credentials and navigating to home.
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if needed
      // await this.authService.deleteData('logout/');

      // Clear local credentials
      this.authService.removeAuthCredentials();

      // Navigate to home page
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear credentials and navigate even if API call fails
      this.authService.removeAuthCredentials();
      this.router.navigate(['/home']);
    }
  }

  public goToMediaHome() {
    console.log('go home');
    this.router.navigate(['/media-home']);
  }

  /**
   * Cleans up router subscription on destroy.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
