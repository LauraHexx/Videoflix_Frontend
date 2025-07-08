import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../../../../shared/models/video';
import { UserWatchHistory } from '../../../../shared/models/user-watch-history';
import { VideoService } from '../../services/video.service';
import { Observable, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@Component({
  selector: 'app-video-carousel',
  imports: [CommonModule, VideoCardComponent],
  providers: [VideoService],
  templateUrl: './video-carousel.component.html',
  styleUrl: './video-carousel.component.scss',
})
export class VideoCarouselComponent {
  constructor(private videoService: VideoService, private http: HttpClient) {}
  @Input() genre: string = '';
  @Input() isContinueWatching: boolean = false;
  videos$!: Observable<Video[]>;

  /**
   * Lifecycle hook called when input properties change.
   * Decides whether to load watch history videos or genre videos.
   * @param changes - Object containing changes of input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isContinueWatching) {
      this.loadWatchHistoryVideos();
    } else {
      this.loadGenreVideos();
    }
  }

  /**
   * Loads videos from user's watch history where progress > 0.
   */
  private loadWatchHistoryVideos(): void {
    this.videos$ = this.videoService.getVideoWatchHistory().pipe(
      map((historyItems: UserWatchHistory[]) =>
        historyItems
          .filter((item) => item.progress > 0)
          .map((item) => ({ ...item.video, watch_progress: item.progress }))
      ),
      catchError(() => of([]))
    );
  }

  /**
   * Loads all videos and filters by genre if specified.
   */
  private loadGenreVideos(): void {
    this.videos$ = this.videoService.getAllVideos().pipe(
      map((videos: Video[]) =>
        this.genre ? videos.filter((v) => v.genre === this.genre) : videos
      ),
      catchError(() => of([]))
    );
  }

  /**
   * TrackBy function to optimize ngFor rendering by video id.
   * @param index - The current index in the ngFor loop.
   * @param video - The current video object.
   * @returns The unique id of the video.
   */
  trackByVideoId(index: number, video: Video): number {
    return video.id;
  }
}
