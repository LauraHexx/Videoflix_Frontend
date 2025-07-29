import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-success',
  imports: [RouterModule],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.scss',
})
export class RegisterSuccessComponent {
  constructor(private router: Router) {}
}
