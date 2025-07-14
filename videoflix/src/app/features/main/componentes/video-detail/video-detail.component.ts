import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { Video } from '@shared/models/video';
import { HeroSectionComponent } from '../hero-section/hero-section.component';

@Component({
  selector: 'app-video-detail',
  imports: [CommonModule, HeroSectionComponent],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss',
})
export class VideoDetailComponent {
  @ViewChild('target', { static: false }) target!: ElementRef;
  videoId: string | null = null;
  player: any;

  constructor(public videoService: VideoService) {}
}
