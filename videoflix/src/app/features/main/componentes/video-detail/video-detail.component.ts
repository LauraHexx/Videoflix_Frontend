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

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.videoId = params.get('id');
      if (this.videoId) {
        this.getVideoGenre();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getVideoIdFormUrl() {
    this.videoId = this.route.snapshot.paramMap.get('id');
  }

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
