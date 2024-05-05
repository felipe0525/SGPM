import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {TableInspectionsComponent} from "../../../shared/components/table-inspections/table-inspections.component";

@Component({
  selector: 'app-inspections',
  standalone: true,
  imports: [
    HeaderComponent,
    TableInspectionsComponent
  ],
  templateUrl: './inspections.component.html',
  styleUrl: './inspections.component.css'
})
export class InspectionsComponent {

}
