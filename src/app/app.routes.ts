import { Routes } from '@angular/router';
import {LoginComponent} from "./features/authentication/login/login.component";
import {HomeComponent} from "./features/general/home/home.component";
import {InspectionsComponent} from "./features/bridge-management/inspections/inspections.component";
import {InspectionBridgeComponent} from "./features/bridge-management/inspection-bridge/inspection-bridge.component";
import {InventoriesComponent} from "./features/bridge-management/inventories/inventories.component";
import {InventoryBridgeComponent} from "./features/bridge-management/inventory-bridge/inventory-bridge.component";
import {ManageUsersComponent} from "./features/account-management/manage-users/manage-users.component";
import {NotFoundComponent} from "./features/general/not-found/not-found.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  {
    path: 'home/bridge-management',
    children: [
      { path: 'inventories', component: InventoriesComponent }, // aparecen todos los inventarios
      { path: 'inventories/inventory-bridge', component: InventoryBridgeComponent }, // se crea un nuevo inventario
      { path: 'inventories/:bridgeIdentification/inspections', component: InspectionsComponent }, // se ven las inspecciones de un inventario
      { path: 'inventories/:bridgeIdentification/inventory-bridge', component: InventoryBridgeComponent }, // se modifica el inventario seleccionado
      { path: 'inventories/:bridgeIdentification/inspections/inventory-bridge', component: InventoryBridgeComponent }, // se ve el inventario
      { path: 'inventories/:bridgeIdentification/inspections/:inspectionId/inspection-bridge', component: InspectionBridgeComponent }, // se ve la inspección detallada
      { path: 'inventories/:bridgeIdentification/view-inventory-bridge', component: InventoryBridgeComponent },

      { path: '', redirectTo: 'inventories', pathMatch: 'full' }
    ]
  },
  { path: 'home/account-management', component: ManageUsersComponent },
  { path: '**', component: NotFoundComponent }
];
