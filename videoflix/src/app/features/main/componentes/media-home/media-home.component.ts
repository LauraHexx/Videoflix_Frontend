import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { CategoryGridComponent } from '../category-grid/category-grid.component';

@Component({
  selector: 'app-media-home',
  imports: [HeroSectionComponent, CategoryGridComponent],
  templateUrl: './media-home.component.html',
  styleUrl: './media-home.component.scss',
})
export class MediaHomeComponent {
  topPickVideo = {
    title: 'Top Pick Video',
    description: 'This is a description of the top pick video',
    image: 'https://via.placeholder.com/150',
  };

  categories = [];
}
