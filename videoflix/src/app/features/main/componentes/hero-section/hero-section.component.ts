import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements AfterViewInit {
  @ViewChild('heroVideo') heroVideoRef!: ElementRef<HTMLVideoElement>;
  private videoService = inject(VideoService);
  private router = inject(Router);
  topPickVideo: Video | null = null;

  ngOnInit() {
    this.videoService.getHeroVideo().subscribe((video) => {
      this.topPickVideo = video;
      // When video data is loaded, try to play the video
      setTimeout(() => {
        this.tryPlayVideo();
      }, 100);
    });
  }

  ngAfterViewInit() {
    // Try to play video after view is initialized
    setTimeout(() => {
      this.tryPlayVideo();
    }, 500);
  }

  public tryPlayVideo() {
    if (this.heroVideoRef && this.heroVideoRef.nativeElement) {
      const video = this.heroVideoRef.nativeElement;

      // Ensure video is muted for autoplay to work
      video.muted = true;

      // Try to play the video
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error);
        // If autoplay fails, we can add a fallback or retry mechanism
      });
    }
  }

  // New method for the play button action
  onPlayButtonClick() {
    if (this.topPickVideo) {
      this.router.navigate(['/video', this.topPickVideo.id]);
    }
  }
}
