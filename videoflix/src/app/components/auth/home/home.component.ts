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
  backgroundImage = `
    linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url('/imgs/bg-home.jpg')
  `;
}
