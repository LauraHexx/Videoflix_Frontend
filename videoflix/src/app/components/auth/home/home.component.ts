import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../auth-styles.css'],
})
export class HomeComponent {
  backgroundImage = 'url(/imgs/bg-home.jpg)';
}
