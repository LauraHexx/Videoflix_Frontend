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
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';

@Component({
  selector: 'app-video-detail',
  imports: [CommonModule],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss',
})
export class VideoDetailComponent {
  @ViewChild('target', { static: false }) target!: ElementRef;
  video: Video | null = null;
  player: any;
  private intervalId: any;

  constructor(
    private route: ActivatedRoute,
    public videoService: VideoService
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
      },
      error: (err) => console.error('Error loading video:', err),
    });
  }
}
