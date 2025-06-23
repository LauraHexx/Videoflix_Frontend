import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../../../shared/models/video';

@Component({
  selector: 'app-video-card',
  imports: [CommonModule],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent {
  @Input() video: Video = {} as Video;
}
