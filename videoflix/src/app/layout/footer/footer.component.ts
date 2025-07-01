import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit, OnDestroy {
  showFooter = false;
  isMediaHome = false;
  private subscription!: Subscription;

  constructor(private router: Router) {}

  /**
   * Subscribes to route changes and updates footer visibility and positioning.
   */
  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.toLowerCase();
        this.showFooter = this.shouldShowFooter(url);
        this.isMediaHome = this.isMediaHomePage(url);
      });

    // Direkt initial ausführen
    const currentUrl = this.router.url.toLowerCase();
    this.showFooter = this.shouldShowFooter(currentUrl);
    this.isMediaHome = this.isMediaHomePage(currentUrl);
  }

  /**
   * Returns true if the footer should be shown.
   */
  private shouldShowFooter(url: string): boolean {
    return !(url.includes('privacy-policy') || url.includes('imprint'));
  }

  /**
   * Returns true if the current page is media-home.
   */
  private isMediaHomePage(url: string): boolean {
    return url.includes('media-home') || url === '/' || url === '';
  }

  /**
   * Unsubscribes from router events to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
