import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import '@videojs/http-streaming';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class VideoDetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('target', { static: false }) target!: ElementRef;
  private route = inject(ActivatedRoute);
  private videoService = inject(VideoService);

  player: any;
  video: Video | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.videoService.getVideoById(id).subscribe((video) => {
        this.video = video;
        setTimeout(() => {
          this.initializePlayer();
        }, 100);
      });
    }
  }

  ngAfterViewInit() {
    // Video.js wird jetzt in initializePlayer() initialisiert
  }

  private initializePlayer() {
    if (this.target && this.target.nativeElement && this.video) {
      this.player = videojs(this.target.nativeElement, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        html5: {
          hls: {
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            overrideNative: true,
          },
        },
      });
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
