import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';
import { NgIf, CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, combineLatest, startWith, filter, map } from 'rxjs';

@Component({
  selector: 'app-hero-section',
  imports: [NgIf, CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements OnChanges {
  private router = inject(Router);
  private subscription = new Subscription();
  isTargetPageAndSmallScreen = false;
  @ViewChild('Video') videoRef!: ElementRef<HTMLVideoElement>;
  videoService = inject(VideoService);
  @Input() videoId: string | null = null;
  video: Video | null = null;

  /**
   * Reacts to input changes and reloads the video if the videoId has changed.
   * @param changes - The changed input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['videoId'] &&
      changes['videoId'].currentValue !== changes['videoId'].previousValue
    ) {
      this.loadVideo(this.videoId);
    }
  }

  /**
   * Attempts to autoplay the video by muting it first. Logs an error if autoplay is blocked.
   */
  public tryPlayVideo() {
    if (this.videoRef?.nativeElement) {
      const video = this.videoRef.nativeElement;
      video.muted = true;
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  }

  /**
   * Opens the video player for a specific video ID via the video service.
   * @param videoId - ID of the video to open.
   */
  public openVideoPlayer(videoId: number) {
    this.videoService.openVideoPlayer(videoId.toString());
  }

  /**
   * Loads video data from the backend using the provided ID.
   * @param id - The ID of the video to load.
   */
  private loadVideo(id: string | null): void {
    if (!id) return;
    this.videoService.getVideoById(id).subscribe({
      next: (video) => {
        this.video = video;
      },
      error: (err) => console.error('Error loading video:', err),
    });
  }

  /**
   * Resets the watch progress of the current video to 0 and opens the video player.
   * Only executes if a valid video ID is available.
   * Sends a POST request to update the watch history before launching the player.
   */
  public startFromBeginning(): void {
    if (this.video?.id !== undefined) {
      const videoId = this.video.id.toString();

      this.videoService.postVideoWatchHistory(videoId, 0).subscribe({
        next: () => {
          this.videoService.openVideoPlayer(videoId);
        },
        error: (err) => console.error('Failed to reset watch progress', err),
      });
    }
  }

  /**
   * Checks whether the current route is the media-home page.
   * @returns True if on media-home route, otherwise false.
   */
  public checkIfMediaHome(): boolean {
    return this.router.url.includes('media-home');
  }
}
