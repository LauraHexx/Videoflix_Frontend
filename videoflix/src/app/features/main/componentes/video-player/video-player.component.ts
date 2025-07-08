import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';

@Component({
  selector: 'app-video-player',
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  standalone: true,
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('target', { static: false }) target!: ElementRef;
  video: Video | null = null;
  player: any;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.videoService.getVideoById(id).subscribe({
        next: (video) => {
          this.video = video;
          this.initializePlayer();
        },
        error: (err) => console.error('Error loading video:', err),
      });
    }
  }

  ngAfterViewInit() {
    if (this.video) {
      this.initializePlayer();
    }
  }

  private initializePlayer() {
    // Warte bis das Template gerendert ist
    setTimeout(() => {
      if (this.target && this.video && !this.player) {
        this.player = videojs(this.target.nativeElement, {
          controls: true,
          autoplay: false,
          preload: 'auto',
          fluid: true,
          sources: [
            {
              src: this.video.hls_playlist_url,
              type: 'application/x-mpegURL', // Für HLS Streams
            },
          ],
        });
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
