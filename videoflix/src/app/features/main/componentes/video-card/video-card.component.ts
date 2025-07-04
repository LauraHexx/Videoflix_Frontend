import { Component, Input } from '@angular/core';
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
  progressPercent: number | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    if (this.video?.id) {
      this.loadWatchProgress(this.video.id, this.video.duration);
    }
  }

  /**
   * Loads the user's watch progress for a given video and calculates the progress bar percentage.
   * @param videoId - The ID of the video
   * @param duration - The total duration of the video in seconds
   */
  private loadWatchProgress(videoId: number, duration?: number): void {
    this.videoService
      .getWatchHistoryByVideo(videoId.toString())
      .subscribe((watchhistory) => {
        this.handleWatchHistoryResponse(watchhistory, duration);
      });
  }

  /**
   * Handles the API response by calculating and assigning the progress percent.
   * @param watchhistory - List of watch history entries
   * @param duration - Duration of the video in seconds
   */
  private handleWatchHistoryResponse(
    watchhistory: any[],
    duration?: number
  ): void {
    if (watchhistory && watchhistory.length > 0 && duration) {
      const progress = this.extractProgress(watchhistory);
      this.progressPercent = this.calculateProgressPercent(progress, duration);
    } else {
      this.progressPercent = null;
    }
  }

  /**
   * Extracts the watch progress value from the first entry in the list.
   * @param history - Watch history array
   * @returns progress in seconds or 0 if missing
   */
  private extractProgress(history: any[]): number {
    return history[0]?.progress ?? 0;
  }

  /**
   * Calculates the watched percentage of the video.
   * @param progress - Watched time in seconds
   * @param duration - Total video duration in seconds
   * @returns Progress percentage (0–100)
   */
  private calculateProgressPercent(progress: number, duration: number): number {
    return Math.min(100, Math.round((progress / duration) * 100));
  }
}
