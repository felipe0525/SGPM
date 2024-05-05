import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {AccountFormComponent} from "../../../shared/components/account-form/account-form.component";

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [
    HeaderComponent,
    AccountFormComponent
  ],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent {

}
