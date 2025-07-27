import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';

import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
  ],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('media', { static: false })
  videoElementRef!: ElementRef<HTMLVideoElement>;
  hls!: Hls;
  video: Video | null = null;
  qualities: { level: number; label: string }[] = [];
  api!: VgApiService;
  private intervalId: any;
  hlsBitrates: any[] = [];
  isFullscreen = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {
    (window as any).Hls = Hls;
  }

  /**
   * Initializes video by route ID.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.videoService.getVideoById(id).subscribe({
      next: (video) => (this.video = video),
      error: (err) => console.error('Error loading video:', err),
    });
  }

  /**
   * Handles player ready event and initializes qualities and progress.
   */
  onPlayerReady(api: VgApiService): void {
    this.api = api;

    setTimeout(() => {
      const videoElement = this.videoElementRef?.nativeElement;
      if (!videoElement || !this.video?.hls_playlist_url) return;

      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(this.video.hls_playlist_url);
        this.hls.attachMedia(videoElement);

        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.qualities = this.hls.levels.map((level: any, index: number) => ({
            level: index,
            label: `${level.height}p`,
          }));
          this.qualities.unshift({ level: -1, label: 'Auto' });

          videoElement.currentTime = this.video?.watch_progress ?? 0;
          this.startWatchProgressInterval();
        });
      } else {
        console.warn('HLS not supported in this browser');
      }
    });
  }

  /**
   * Changes video quality based on user selection.
   */
  changeQuality(event: Event): void {
    const level = parseInt((event.target as HTMLSelectElement).value, 10);
    if (this.hls) {
      this.hls.currentLevel = level;
    }
  }

  /**
   * Skips video playback by specified seconds.
   */
  skip(seconds: number): void {
    if (this.api) {
      const currentTime = this.api.getDefaultMedia().currentTime;
      this.api.getDefaultMedia().currentTime = Math.max(
        0,
        currentTime + seconds
      );
    }
  }

  /**
   * Starts watch progress tracking every 2 seconds.
   */
  private startWatchProgressInterval(): void {
    this.intervalId = setInterval(() => {
      if (
        this.api &&
        this.api.getDefaultMedia().state === 'playing' &&
        this.video?.id
      ) {
        this.pushWatchProgress();
      }
    }, 2000);
  }

  /**
   * Sends watch progress to backend.
   */
  private pushWatchProgress(): void {
    const current = Math.floor(this.api.getDefaultMedia().currentTime);
    this.videoService
      .postVideoWatchHistory(this.video!.id.toString(), current)
      .subscribe({
        error: (err) => console.error('Failed to update progress', err),
      });
  }

  /**
   * Cleanup on destroy.
   */
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public toggleFullscreen() {
    this.api.fsAPI.toggleFullscreen(this.api.videogularElement);
    this.isFullscreen = !this.isFullscreen;
  }
}
