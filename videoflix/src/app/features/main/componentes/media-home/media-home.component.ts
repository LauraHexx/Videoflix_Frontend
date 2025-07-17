import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { CategoryGridComponent } from '../category-grid/category-grid.component';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';
import { Router } from '@angular/router';
@Component({
  selector: 'app-media-home',
  imports: [CommonModule, HeroSectionComponent, CategoryGridComponent],
  templateUrl: './media-home.component.html',
  styleUrl: './media-home.component.scss',
})
export class MediaHomeComponent {
  private router = inject(Router);
  videoService = inject(VideoService);
  video: Video | null = null;
  videoId: string = '';

  ngOnInit() {
    this.videoService.getHeroVideo().subscribe((video) => {
      this.video = video;
      this.videoId = String(video.id);
    });
  }

  public checkIfMediaHome(): boolean {
    return this.router.url.includes('media-home');
  }
}
