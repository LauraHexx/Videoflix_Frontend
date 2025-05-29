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
  showButton = true;
  showArrowBack = false;

  constructor(private router: Router, private location: Location) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url.toLowerCase();

        this.showButton = !(
          url.includes('login') || url.includes('privacy-policy')
        );

        this.showArrowBack =
          url.includes('privacy-policy') || url.includes('impressum');
      });
  }

  /**
   * Navigates back to the previous page in the browser history.
   */
  goBack(): void {
    this.location.back();
  }
}
