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
import { NgIf } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, combineLatest, startWith, filter, map } from 'rxjs';

@Component({
  selector: 'app-hero-section',
  imports: [NgIf],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements OnChanges {
  private router = inject(Router);

  private subscription = new Subscription();
  isTargetPageAndSmallScreen = false;

  constructor() {}

  @ViewChild('Video') videoRef!: ElementRef<HTMLVideoElement>;
  videoService = inject(VideoService);
  @Input() videoId: string | null = null;
  video: Video | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['videoId'] &&
      changes['videoId'].currentValue !== changes['videoId'].previousValue
    ) {
      this.loadVideo(this.videoId);
    }
  }

  public tryPlayVideo() {
    if (this.videoRef?.nativeElement) {
      const video = this.videoRef.nativeElement;
      video.muted = true;
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  }

  public openVideoPlayer(videoId: number) {
    this.videoService.openVideoPlayer(videoId.toString());
  }

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
}
