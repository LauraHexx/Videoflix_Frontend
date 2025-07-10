import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/services/api-service/api.service';
import { VideosEndpoints } from '../../../core/endpoints/endpoints';
import { Video } from '../../../shared/models/video';
import { UserWatchHistory } from '../../../shared/models/user-watch-history';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * Fetches the hero video.
   * @returns Observable with the hero Video object.
   */
  getHeroVideo(): Observable<Video> {
    return this.apiService
      .get<Video>(VideosEndpoints.hero)
      .pipe(map((response) => response.body as Video));
  }

  /**
   * Fetches all available videos.
   * @returns Observable with an array of Video objects.
   */
  getAllVideos(): Observable<Video[]> {
    return this.apiService
      .get<Video[]>(VideosEndpoints.list)
      .pipe(map((response) => response.body as Video[]));
  }

  /**
   * Fetches the list of unique video genres.
   * @returns Observable with an array of genre strings.
   */
  getVideoGenres(): Observable<string[]> {
    return this.apiService
      .get<{ genres: string[] }>(VideosEndpoints.genres)
      .pipe(map((response) => response.body?.genres || []));
  }

  /**
   * Retrieves the user's watch history for videos.
   * @returns Observable with an array of watch historys.
   */
  getVideoWatchHistory(): Observable<UserWatchHistory[]> {
    return this.apiService
      .get<UserWatchHistory[]>(VideosEndpoints.watchHistory)
      .pipe(map((response) => response.body as UserWatchHistory[]));
  }

  /**
   * Posts the watch progress for a specific video.
   * @param videoId - The ID of the video.
   * @param progress - Progress in seconds.
   * @returns Observable with the created/updated watch history.
   */
  postVideoWatchHistory(
    videoId: string,
    progress: number
  ): Observable<UserWatchHistory | null> {
    return this.apiService
      .post<UserWatchHistory>(VideosEndpoints.watchHistory, {
        video_id: videoId,
        progress: progress,
      })
      .pipe(map((response) => response.body));
  }

  /**
   * Fetches details of a video by ID.
   * @param id - Video ID.
   * @returns Observable with the Video object.
   */
  getVideoById(id: string): Observable<Video> {
    return this.apiService
      .get<Video>(VideosEndpoints.detail(id))
      .pipe(map((response) => response.body as Video));
  }

  /**
   * Navigates to the video player page for the given video ID.
   * @param videoId - The ID of the video to play.
   */
  openVideoPlayer(videoId: string): void {
    this.router.navigate(['/video', videoId]);
  }
}
