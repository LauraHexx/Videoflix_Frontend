import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/services/api-service/api.service';
import { VideosEndpoints } from '../../../core/endpoints/endpoints';
import { Video } from '../../../shared/models/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private apiService: ApiService) {}

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
   * Retrieves the user's watch history for videos.
   * @returns Observable with an array of Video objects from watch history.
   */
  getVideoWatchHistory(): Observable<Video[]> {
    return this.apiService
      .get<Video[]>(VideosEndpoints.watchHistory)
      .pipe(map((response) => response.body as Video[]));
  }

  /**
   * Retrieves watch history entries for a specific video.
   * @param videoId - ID of the video to get history for.
   * @returns Observable with watch history data for the video.
   */
  getWatchHistoryByVideo(videoId: string): Observable<any> {
    return this.apiService
      .get<any>(VideosEndpoints.watchHistoryByVideo(videoId))
      .pipe(map((response) => response.body));
  }

  /**
   * Posts a new watch history entry for a video.
   * @param videoId - ID of the video to add history for.
   * @returns Observable with the created watch history response.
   */
  postVideoWatchHistory(videoId: string): Observable<any> {
    return this.apiService
      .post(VideosEndpoints.watchHistory, {
        video_id: videoId,
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
}
