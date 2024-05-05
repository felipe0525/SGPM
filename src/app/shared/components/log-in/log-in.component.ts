import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  constructor(private router: Router) {}


  onSubmit() {
    this.redirect();
  }
  redirect() {
    this.router.navigate(['/home']);
  }

}
