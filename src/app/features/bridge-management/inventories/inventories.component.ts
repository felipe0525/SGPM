import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {TableInventoriesComponent} from "../../../shared/components/table-inventories/table-inventories.component";

@Component({
  selector: 'app-inventories',
  standalone: true,
  imports: [
    HeaderComponent,
    TableInventoriesComponent
  ],
  templateUrl: './inventories.component.html',
  styleUrl: './inventories.component.css'
})
export class InventoriesComponent {

}
