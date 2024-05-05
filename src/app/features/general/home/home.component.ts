import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {InfoMainComponent} from "../../../shared/components/info-main/info-main.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    InfoMainComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
