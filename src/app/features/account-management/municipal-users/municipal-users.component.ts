import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {TableMunicipalComponent} from "../../../shared/components/table-municipal/table-municipal.component";

@Component({
  selector: 'app-municipal-users',
  standalone: true,
  imports: [
    HeaderComponent,
    TableMunicipalComponent
  ],
  templateUrl: './municipal-users.component.html',
  styleUrl: './municipal-users.component.css'
})
export class MunicipalUsersComponent {

}
