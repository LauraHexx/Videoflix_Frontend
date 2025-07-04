import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../../../../shared/models/video';
import { UserWatchHistory } from '../../../../shared/models/user-watch-history';
import { VideoService } from '../../services/video.service';
import { Observable, map } from 'rxjs';
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
  videos$!: Observable<Video[]>;
  watchHistory$!: Observable<UserWatchHistory[]>;

  ngOnInit() {
    this.videos$ = this.videoService.getAllVideos();
    this.watchHistory$ = this.videoService
      .getVideoWatchHistory()
      .pipe(map((list) => list.filter((entry) => entry.progress > 0)));
    console.log('videos$', this.videos$);
  }
}
