import { Component, ViewChild, ElementRef, inject, Input } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [NgIf],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  @ViewChild('Video') videoRef!: ElementRef<HTMLVideoElement>;
  videoService = inject(VideoService);
  @Input() videoId: string | null = null;
  video: Video | null = null;

  ngOnInit(): void {
    this.loadVideoById(this.videoId);
  }

  public tryPlayVideo() {
    if (this.videoRef && this.videoRef.nativeElement) {
      const video = this.videoRef.nativeElement;
      video.muted = true;
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  }

  public openVideoPlayer(videoId: number) {
    this.videoService.openVideoPlayer(videoId.toString());
  }

  private loadVideoById(id: string | null): void {
    if (!id) return;
    this.videoService.getVideoById(id).subscribe({
      next: (video) => {
        this.video = video;
      },
      error: (err) => console.error('Error loading video:', err),
    });
  }
}
