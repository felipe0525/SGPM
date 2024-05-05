import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {InventoryFormComponent} from "../../../shared/components/inventory-form/inventory-form.component";

@Component({
  selector: 'app-inventory-bridge',
  standalone: true,
  imports: [
    HeaderComponent,
    InventoryFormComponent
  ],
  templateUrl: './inventory-bridge.component.html',
  styleUrl: './inventory-bridge.component.css'
})
export class InventoryBridgeComponent {

}
