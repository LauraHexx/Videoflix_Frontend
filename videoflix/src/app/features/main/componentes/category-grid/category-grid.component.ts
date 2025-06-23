import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCarouselComponent } from '../video-carousel/video-carousel.component';
import { Video } from '../../../../shared/models/video';
import { videos } from '../../../../../../public/dev_media/json_data';

@Component({
  selector: 'app-category-grid',
  imports: [CommonModule, VideoCarouselComponent],
  templateUrl: './category-grid.component.html',
  styleUrl: './category-grid.component.scss',
})
export class CategoryGridComponent {
  genres = ['nature', 'animals', 'cars', 'food', 'tech', 'sports'];
  videos: Video[] = videos;
  topPickVideo = videos[Math.floor(Math.random() * videos.length)];
}
