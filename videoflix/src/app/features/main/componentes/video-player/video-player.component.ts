import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
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
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  video: Video | null = null;
  qualities: { level: number; label: string }[] = [];
  api!: VgApiService;
  private intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

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

  onPlayerReady(api: VgApiService): void {
    this.api = api;
    const media = this.api.getDefaultMedia();
    const mediaElem = (media as any).mediaElement;

    if (mediaElem?.hls && mediaElem.hls.levels) {
      this.qualities = mediaElem.hls.levels.map(
        (level: any, index: number) => ({
          level: index,
          label: `${level.height}p`,
        })
      );
    }

    media.currentTime = this.video?.watch_progress ?? 0;

    // media.play().catch((err: unknown) => {
    //   console.warn('Play konnte nicht gestartet werden:', err);
    // });

    this.startWatchProgressInterval();
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

  skip(seconds: number): void {
    if (this.api) {
      const currentTime = this.api.getDefaultMedia().currentTime;
      this.api.getDefaultMedia().currentTime = Math.max(
        0,
        currentTime + seconds
      );
    }
  }

  changeQuality(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const level = parseInt(select.value, 10);
    const mediaElem = (this.api.getDefaultMedia() as any).mediaElement;

    if (mediaElem?.hls) {
      mediaElem.hls.currentLevel = level; // -1 für Auto
    }
  }

  onBuffering(event: Event): void {
    // Beispiel: true/false je nach Eventtyp ableiten oder Event auswerten
    console.log('Buffering event:', event);
  }

  /**
   * Cleanup on destroy.
   */
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  playVideo(): void {
    const media = this.api.getDefaultMedia();
    media.play();
  }

  ngAfterViewInit(): void {}
}
