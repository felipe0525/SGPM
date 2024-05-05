import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent {


  userType: string = '';
  municipioDisabled: boolean = true;

  constructor() {
  }

  //metodo para habilitar o deshabilitar el estatus del municipio
  updateMunicipioStatus(): void {
    this.municipioDisabled = this.userType !== 'Municipal';
  }





}
