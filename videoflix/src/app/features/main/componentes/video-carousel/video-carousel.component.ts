import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../../../../shared/models/video';

@Component({
  selector: 'app-video-carousel',
  imports: [CommonModule, VideoCardComponent],
  templateUrl: './video-carousel.component.html',
  styleUrl: './video-carousel.component.scss',
})
export class VideoCarouselComponent {
  @Input() genre: string = '';
  @Input() videos: Video[] = [];
}
