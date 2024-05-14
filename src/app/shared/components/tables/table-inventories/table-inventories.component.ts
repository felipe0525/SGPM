import {Component, OnInit} from '@angular/core';
import {routes} from "../../../../app.routes";
import {Router} from "@angular/router";
import {Inventory} from "../../../../models/bridge/inventory";
import {InventoryServiceService} from "../../../services/bridge-services/inventory-service.service";
import { NgForOf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-inventories',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './table-inventories.component.html',
  styleUrl: './table-inventories.component.css'
})
export class TableInventoriesComponent implements OnInit {
  inventories: Inventory[] = [];

  constructor(private inventoryService: InventoryServiceService, private router: Router) {}

  ngOnInit() {
    this.inventoryService.getInventories().subscribe((data: Inventory[]) => {
      this.inventories = data.map(inventory => ({
        ...inventory,
        inventoryDate: (inventory.inventoryDate as any).toDate() // Convierte a instancia de Date
      }));
    });
  }

  navigateToCreateInventory() {
    this.router.navigate(['home/bridge-management/inventories/inventory-bridge']);
  }

  navigateToInspections(bridgeId: string) {
    this.router.navigate([`home/bridge-management/inventories/${bridgeId}/inspections`]);
  }
}
