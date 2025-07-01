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

  getHeroVideo(): Observable<Video> {
    return this.apiService
      .get<Video>(VideosEndpoints.hero)
      .pipe(map((response) => response.body as Video));
  }

  getAllVideos(): Observable<Video[]> {
    return this.apiService
      .get<Video[]>(VideosEndpoints.list)
      .pipe(map((response) => response.body as Video[]));
  }

  getVideoWatchHistory(): Observable<Video[]> {
    return this.apiService
      .get<Video[]>(VideosEndpoints.watchHistory)
      .pipe(map((response) => response.body as Video[]));
  }

  postVideoWatchHistory(videoId: string): Observable<any> {
    return this.apiService
      .post(VideosEndpoints.watchHistory, {
        video_id: videoId,
      })
      .pipe(map((response) => response.body));
  }

  getVideoById(id: string): Observable<Video> {
    return this.apiService
      .get<Video>(VideosEndpoints.detail(id))
      .pipe(map((response) => response.body as Video));
  }
}
