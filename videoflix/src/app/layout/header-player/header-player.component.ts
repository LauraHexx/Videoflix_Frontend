import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { VideoService } from '../../features/main/services/video.service';
import { Video } from '@shared/models/video';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-header-player',
  imports: [CommonModule, RouterModule],
  templateUrl: './header-player.component.html',
  styleUrl: './header-player.component.scss',
})
export class HeaderPlayerComponent implements OnInit {
  showImages = true;
  private hideTimeout: any;
  videoTitle: string | null = null;
  private sub?: Subscription;

  constructor(private router: Router, private videoService: VideoService) {}

  /** Initializes the component by retrieving the video title and starting the hide timer. */
  ngOnInit(): void {
    this.getVideoTitle();
    this.startHideTimer();
  }

  /** Subscribes to the current video stream and updates the video title if available. */
  getVideoTitle(): void {
    this.sub = this.videoService.currentVideo$.subscribe(
      (video: Video | null) => {
        this.videoTitle = video?.title ?? null;
      }
    );
  }

  /** Starts or resets a timer to hide the images after 4 seconds of inactivity. */
  startHideTimer(): void {
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.showImages = false;
    }, 4000);
  }

  /** Shows the images and restarts the hide timer when the header is hovered. */
  onHeaderHover(): void {
    this.showImages = true;
    this.startHideTimer();
  }

  /** Navigates one step back in the browser history. */
  goBack(): void {
    window.history.back();
  }

  /** Navigates to the media home page. */
  goToMediaHome(): void {
    this.router.navigate(['/media-home']);
  }
}
