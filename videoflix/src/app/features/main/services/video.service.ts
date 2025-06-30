import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api-service/api.service';
import { VideosEndpoints } from '../../../core/endpoints/endpoints';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private apiService: ApiService) {}

  getHeroVideo() {
    return this.apiService.get(VideosEndpoints.hero);
  }

  getAllVideos() {
    return this.apiService.get(VideosEndpoints.list);
  }

  getVideoWatchHistory() {
    return this.apiService.get(VideosEndpoints.watchHistory);
  }

  postVideoWatchHistory(videoId: string) {
    return this.apiService.post(VideosEndpoints.watchHistory, {
      video_id: videoId,
    });
  }
}
