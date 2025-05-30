import { Component, Renderer2, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components-sub/header/header.component';
import { FooterComponent } from './components-sub/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'videoflix';

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.toLowerCase();
        if (url.includes('privacy-policy') || url.includes('impressum')) {
          this.renderer.addClass(document.body, 'dark-background');
        } else {
          this.renderer.removeClass(document.body, 'dark-background');
        }
      });
  }
}
