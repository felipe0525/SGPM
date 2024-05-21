import { Component } from '@angular/core';
import { HomeImage } from '../../../../assets/images/home';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [HomeImage],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomePageComponent {

}
