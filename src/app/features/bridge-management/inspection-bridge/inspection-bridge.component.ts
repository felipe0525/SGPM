import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {InspectionFormComponent} from "../../../shared/components/inspection-form/inspection-form.component";

@Component({
  selector: 'app-inspection-bridge',
  standalone: true,
  imports: [
    HeaderComponent,
    InspectionFormComponent
  ],
  templateUrl: './inspection-bridge.component.html',
  styleUrl: './inspection-bridge.component.css'
})
export class InspectionBridgeComponent {

}
