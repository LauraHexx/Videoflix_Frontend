import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { ActivatedRoute } from '@angular/router';
import { VideoCarouselComponent } from '../video-carousel/video-carousel.component';
import { VideoService } from '../../services/video.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-video-detail',
  imports: [CommonModule, HeroSectionComponent, VideoCarouselComponent],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss',
})
export class VideoDetailComponent {
  videoId: string | null = null;
  genre: string = '';
  videoService = inject(VideoService);
  private destroy$ = new Subject<void>();
  constructor(private route: ActivatedRoute) {}

  /**
   * Subscribes to route parameter changes and fetches the video genre if a videoId is present.
   */
  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.videoId = params.get('id');
      if (this.videoId) {
        this.getVideoGenre();
      }
    });
  }

  /**
   * Cleans up subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Extracts the video ID from the current route snapshot.
   */
  private getVideoIdFormUrl() {
    this.videoId = this.route.snapshot.paramMap.get('id');
  }

  /**
   * Fetches the genre of the current video using its ID.
   */
  private getVideoGenre() {
    if (this.videoId) {
      this.videoService.getVideoById(this.videoId).subscribe({
        next: (video) => {
          this.genre = video.genre;
        },
        error: (err) => console.error('Error loading video:', err),
      });
    }
  }
}
