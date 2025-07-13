import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCarouselComponent } from '../video-carousel/video-carousel.component';
import { VideoService } from '../../services/video.service';
import { UserWatchHistory } from '../../../../shared/models/user-watch-history';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CommonModule, VideoCarouselComponent],
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.scss'],
})
export class CategoryGridComponent implements OnInit {
  genres: string[] = [];
  hasContinueWatching = false;

  constructor(private videoService: VideoService) {}

  /**
   * Lifecycle hook called on component initialization.
   * Initiates loading of genres and userwatchhistory.
   */
  ngOnInit(): void {
    this.loadUserWatchHistory();
    this.loadGenres();
  }

  /**
   * Loads the user's watch history and updates the flag
   * if any video has progress greater than 0.
   */
  private loadUserWatchHistory(): void {
    this.videoService
      .getVideoWatchHistory()
      .subscribe((watchHistory: UserWatchHistory[]) => {
        this.hasContinueWatching = watchHistory.some(
          (history) => history.progress > 0
        );
      });
  }

  /**
   * Loads genres from the VideoService and updates the genres array.
   * Handles errors by logging and resetting the genres list.
   */
  private loadGenres(): void {
    this.videoService.getVideoGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: (err) => {
        console.error('Failed to load genres', err);
        this.genres = [];
      },
    });
  }
}
