import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  @ViewChild('heroVideo') heroVideoRef!: ElementRef<HTMLVideoElement>;
  private videoService = inject(VideoService);
  topPickVideo: Video | null = null;
  ngOnInit() {
    this.videoService.getHeroVideo().subscribe((video) => {
      this.topPickVideo = video;
    });
  }

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
