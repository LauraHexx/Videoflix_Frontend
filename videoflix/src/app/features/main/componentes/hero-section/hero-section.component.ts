import { Component, ViewChild, ElementRef } from '@angular/core';
import { Video } from '../../../../shared/models/video';
import { videos } from '@public/dev_media/json_data';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  @ViewChild('heroVideo') heroVideoRef!: ElementRef<HTMLVideoElement>;

  videos: Video[] = videos;
  topPickVideo = videos[Math.floor(Math.random() * videos.length)];

  playVideo() {
    if (this.heroVideoRef) {
      const video = this.heroVideoRef.nativeElement;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
}
