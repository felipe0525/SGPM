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
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},

  {
    path: 'home/bridge-management',
    children: [
      { path: 'inspections', component: InspectionsComponent },
      { path: 'inspections/inspection-bridge', component: InspectionBridgeComponent },
      { path: 'inventories', component: InventoriesComponent },
      { path: 'inventories/inventory-bridge', component: InventoryBridgeComponent },
      { path: '', redirectTo: 'inventories', pathMatch: 'full' }

    ]
  },
  { path: 'home/account-management', component: ManageUsersComponent},
  /*
  {
    path: 'home/account-management',
    children: [
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'municipal-users', component: MunicipalUsersComponent },
      { path: 'student-users', component: StudentUsersComponent },
      { path: '', redirectTo: 'municipal-users', pathMatch: 'full' }
    ]
  },
  */
  { path: '**', component: NotFoundComponent }
];
