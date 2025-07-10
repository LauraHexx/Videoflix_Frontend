import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../../../shared/models/video';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-card',
  imports: [CommonModule],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent {
  @Input() video: Video = {} as Video;
  videoService = inject(VideoService);

  /**
   * Returns the watch progress as percentage for the progress bar.
   */
  get progressPercent(): number | null {
    if (!this.video?.watch_progress || !this.video?.duration) return null;
    return Math.min(
      100,
      Math.round((this.video.watch_progress / this.video.duration) * 100)
    );
  }
}
