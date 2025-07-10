import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';

@Component({
  selector: 'app-video-player',
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  standalone: true,
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('target', { static: false }) target!: ElementRef;
  video: Video | null = null;
  player: any;
  private intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  /**
   * Lifecycle hook that triggers on component initialization.
   * Loads the video data using the route parameter.
   */
  ngOnInit(): void {
    this.loadVideoById();
  }

  /**
   * Loads video data by route ID and initializes the player.
   */
  private loadVideoById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.videoService.getVideoById(id).subscribe({
      next: (video) => {
        this.video = video;
        this.initializePlayer();
      },
      error: (err) => console.error('Error loading video:', err),
    });
  }

  /**
   * Lifecycle hook called after the component's view has been fully initialized.
   * Initializes the video player if the video data is loaded.
   */
  ngAfterViewInit() {
    if (this.video) {
      this.initializePlayer();
    }
  }

  /**
   * Initializes the video player after the template is rendered.
   */
  private initializePlayer(): void {
    setTimeout(() => {
      this.setupPlayer();
      this.onPlayerReady();
    }, 100);
  }

  /**
   * Creates the video.js player instance if not already created.
   */
  private setupPlayer(): void {
    if (this.target && this.video && !this.player) {
      this.player = videojs(this.target.nativeElement, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        sources: [
          {
            src: this.video.hls_playlist_url,
            type: 'application/x-mpegURL',
          },
        ],
      });
    }
  }

  /**
   * Sets player start time and starts the watch progress interval.
   */
  private onPlayerReady(): void {
    if (!this.player) return;

    this.player.ready(() => {
      const startSecond = this.video?.watch_progress ?? 0;
      this.player.currentTime(startSecond);
      this.startWatchProgressInterval();
    });
  }

  /**
   * Starts interval to push watch progress every 2 seconds when video plays.
   */
  private startWatchProgressInterval(): void {
    this.intervalId = setInterval(() => {
      if (this.player && !this.player.paused() && this.video?.id) {
        this.pushWatchProgress();
      }
    }, 2000);
  }

  /**
   * Sends current watch progress to the backend.
   */
  private pushWatchProgress(): void {
    const currentTime = Math.floor(this.player.currentTime());
    this.videoService
      .postVideoWatchHistory(this.video!.id.toString(), currentTime)
      .subscribe({
        next: () => console.log(`Watch progress pushed: ${currentTime}s`),
        error: (err) => console.error('Failed to update watch progress', err),
      });
  }

  /**
   * Lifecycle hook called when the component is destroyed.
   * Disposes the video player and clears the watch progress interval.
   */
  ngOnDestroy() {
    this.cleanupResources();
  }

  /**
   * Cleans up player and intervals to prevent memory leaks.
   */
  private cleanupResources(): void {
    if (this.player) {
      this.player.dispose();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
