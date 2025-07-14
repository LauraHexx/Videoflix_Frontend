import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { CategoryGridComponent } from '../category-grid/category-grid.component';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';
@Component({
  selector: 'app-media-home',
  imports: [CommonModule, HeroSectionComponent, CategoryGridComponent],
  templateUrl: './media-home.component.html',
  styleUrl: './media-home.component.scss',
})
export class MediaHomeComponent {
  videoService = inject(VideoService);
  video: Video | null = null;
  videoId: string = '';

  ngOnInit() {
    this.videoService.getHeroVideo().subscribe((video) => {
      this.video = video;
      this.videoId = String(video.id);
    });
  }
}
