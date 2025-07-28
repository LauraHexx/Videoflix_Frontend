import { Component, Renderer2, OnInit, OnDestroy, Inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderPlayerComponent } from './layout/header-player/header-player.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    HeaderPlayerComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'videoflix';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Initializes router event listener and sets CSS class based on current route.
   */
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._updateDarkBackground(event.urlAfterRedirects.toLowerCase());
      });
  }

  /**
   * Adds or removes 'dark-background' class depending on the route.
   * @param url - The current route path in lowercase
   */
  private _updateDarkBackground(url: string): void {
    const element = document.getElementById('imprint') || document.body;

    if (url.includes('privacy-policy') || url.includes('imprint')) {
      this.renderer.addClass(element, 'dark-background');
    } else {
      this.renderer.removeClass(element, 'dark-background');
    }
  }

  /** Shows the header-player only on video detail routes like /video/19 */
  isVideoRoute(): boolean {
    return this.router.url.startsWith('/video/');
  }
}
